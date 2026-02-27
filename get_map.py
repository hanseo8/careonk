import urllib.request
import json

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

    all_paths = []
    for obj in data['objects'].values():
        if 'geometries' in obj:
            for geo in obj['geometries']:
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
                            s_points = ring_points[::max(1, len(ring_points)//200)] # Keep a lot of points for high precision
                            s_points.append(ring_points[-1])
                            all_paths.append(s_points)

    xs = []
    ys = []
    for p in all_paths:
        for x, y in p:
            xs.append(x)
            ys.append(y)

    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)

    width = 500
    height = 600

    def tx(lon): return ((lon - min_x) / (max_x - min_x)) * 300 + 100
    def ty(lat): return (1 - (lat - min_y) / (max_y - min_y)) * 480 + 30

    final_d = []
    for p in all_paths:
        pts = [f"{tx(x):.1f},{ty(y):.1f}" for x, y in p]
        if len(pts) > 5:
            path_str = f"M{pts[0]} " + " ".join([f"L{pt}" for pt in pts[1:]]) + " Z"
            final_d.append(path_str)

    final_d.sort(key=len, reverse=True)
    with open('map_path_output.txt', 'w') as f:
        f.write(" ".join(final_d[:20])) # Top 20 islands/landmasses
    print("Map generated!")
except Exception as e:
    print(f"Error: {e}")
