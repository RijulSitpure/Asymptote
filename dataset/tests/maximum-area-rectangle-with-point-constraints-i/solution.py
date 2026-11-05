class Solution:
    def maxRectangleArea(self, points: list[list[int]]) -> int:
        pt_set = set(map(tuple, points))
        max_area = -1
        n = len(points)
        
        for i in range(n):
            for j in range(i + 1, n):
                x1, y1 = points[i]
                x2, y2 = points[j]
                if x1 == x2 or y1 == y2:
                    continue
                if (x1, y2) in pt_set and (x2, y1) in pt_set:
                    min_x, max_x = min(x1, x2), max(x1, x2)
                    min_y, max_y = min(y1, y2), max(y1, y2)
                    corners = {(x1, y1), (x2, y2), (x1, y2), (x2, y1)}
                    valid = True
                    for px, py in points:
                        if min_x <= px <= max_x and min_y <= py <= max_y:
                            if (px, py) not in corners:
                                valid = False
                                break
                    if valid:
                        area = abs(x1 - x2) * abs(y1 - y2)
                        if area > max_area:
                            max_area = area
                            
        return max_area
