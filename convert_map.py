import json

def get_korea_path():
    try:
        with open('sk-map.json', 'r') as f:
            data = json.load(f)
        
        # We need to extract arcs to form a single combined SVG path
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
                    geom_type = geo['type']
                    arcs_list = geo['arcs']
                    
                    if geom_type == 'Polygon':
                        polygons = [arcs_list]
                    elif geom_type == 'MultiPolygon':
                        polygons = arcs_list
                    else:
                        continue
                        
                    for polygon in polygons:
                        for ring in polygon:
                            ring_points = []
                            for arc_idx in ring:
                                ring_points.extend(decode_arc(arc_idx))
                            
                            # Simplify the path heavily to fit the 500x600 SVG viewBox and not be 50,000 chars
                            if len(ring_points) > 20: 
                                s_points = ring_points[::len(ring_points)//20 + 1]
                                s_points.append(ring_points[-1])
                                
                                path_str = f"M{s_points[0][0]},{s_points[0][1]} " + " ".join([f"L{p[0]},{p[1]}" for p in s_points[1:]]) + " Z"
                                all_paths.append(path_str)
        
        # We just want a simple path string. However, topojson coords are usually Lon/Lat.
        # Let's project them to fit a 500x600 box.
        # Korea bounds approx: Extent: 125, 33 to 131, 39
        xs = []
        ys = []
        for p in all_paths:
            coords = p.replace('M', '').replace('Z', '').replace('L', '').split()
            for c in coords:
                x, y = map(float, c.split(','))
                if x < 150 and y < 50: # valid lat long
                    xs.append(x)
                    ys.append(y)
        
        if not xs:
            return "Error parsing"
            
        min_x, max_x = min(xs), max(xs)
        min_y, max_y = min(ys), max(ys)
        
        width = 500
        height = 600
        
        # Transform functions
        def tx(lon):
            return ((lon - min_x) / (max_x - min_x)) * width * 0.7 + 50
        def ty(lat):
            return (1 - (lat - min_y) / (max_y - min_y)) * height * 0.8 + 20
        
        final_d = []
        for p in all_paths:
            parts = p.split()
            new_parts = []
            for part in parts:
                if part in ['M', 'L', 'Z']:
                    continue
                cmd = part[0]
                if cmd in ['M', 'L']:
                    x, y = map(float, part[1:].split(','))
                    new_parts.append(f"{cmd}{tx(x):.1f},{ty(y):.1f}")
            if len(new_parts) > 5: # only keep significant islands/mainland
                final_d.append(" ".join(new_parts) + " Z")
                
        # Sort by length to keep the biggest ones (mainland + jeju)
        final_d.sort(key=len, reverse=True)
        return " ".join(final_d[:5])
        
    except Exception as e:
        return str(e)

with open('map_path_output.txt', 'w') as f:
    f.write(get_korea_path())
