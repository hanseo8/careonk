import urllib.request
import json
import collections

url = "https://raw.githubusercontent.com/southkorea/southkorea-maps/master/kostat/2018/json/skorea-provinces-2018-topo.json"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())

    arcs = data['arcs']
    scale = data['transform']['scale']
    translate = data['transform']['translate']

    def decode_arc(arc_idx):
        reverse = False
        if arc_idx < 0:
            arc_idx = ~arc_idx
            reverse = True
        arc = arcs[arc_idx]
        points = []
        x, y = 0, 0
        for dx, dy in arc:
            x += dx
            y += dy
            points.append((x * scale[0] + translate[0], y * scale[1] + translate[1]))
        if reverse:
            points.reverse()
        return points

    province_paths = collections.defaultdict(list)
    all_points = []
    
    for obj in data['objects'].values():
        if 'geometries' in obj:
            for geo in obj['geometries']:
                name = geo['properties']['name_eng']
                if geo['type'] == 'Polygon':
                    polygons = [geo['arcs']]
                elif geo['type'] == 'MultiPolygon':
                    polygons = geo['arcs']
                else:
                    continue
                for polygon in polygons:
                    for ring in polygon:
                        ring_points = []
                        for arc_idx in ring:
                            ring_points.extend(decode_arc(arc_idx))
                        
                        if len(ring_points) > 10:
                            s_points = ring_points[::max(1, len(ring_points)//200)]
                            s_points.append(ring_points[-1])
                            province_paths[name].append(s_points)
                            all_points.extend(s_points)

    xs = [p[0] for p in all_points]
    ys = [p[1] for p in all_points]

    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)

    def tx(lon): return ((lon - min_x) / (max_x - min_x)) * 300 + 100
    def ty(lat): return (1 - (lat - min_y) / (max_y - min_y)) * 480 + 30

    out = "export const PROVINCE_PATHS = {\n"
    for name, paths in province_paths.items():
        strs = []
        for p in paths:
            pts = [f"{tx(x):.1f},{ty(y):.1f}" for x, y in p]
            if len(pts) > 5:
                path_str = f"M{pts[0]} " + " ".join([f"L{pt}" for pt in pts[1:]]) + " Z"
                strs.append(path_str)
        # Simplify name
        key = name.split('-do')[0].split(' ')[0]
        # Mapping rules
        if 'Seoul' in key: key = 'seoul'
        elif 'Incheon' in key: key = 'incheon'
        elif 'Gyeonggi' in key: key = 'gyeonggi'
        elif 'Gangwon' in key: key = 'gangwon'
        elif 'Chungcheong' in key: key = 'chungcheong'
        elif 'Gyeongsang' in key: key = 'gyeongsang'
        elif 'Jeolla' in key: key = 'jeolla'
        elif 'Jeju' in key: key = 'jeju'
        elif 'Busan' in key or 'Daegu' in key or 'Ulsan' in key: key = 'gyeongsang'
        elif 'Gwangju' in key: key = 'jeolla'
        elif 'Daejeon' in key or 'Sejong' in key: key = 'chungcheong'
        
        path_combined = " ".join(strs)
        out += f'  "{name}": "{path_combined}",\n'
    out += "};\n"
    
    with open('components/onboarding/korea-path-9do.ts', 'w', encoding='utf-8') as f:
        f.write(out)
    print("Done generating 9-do paths!")
except Exception as e:
    print(f"Error: {e}")
