class Solution:
    def canReachCorner(self, X: int, Y: int, circles: list[list[int]]) -> bool:
        def in_circle(x, y, cx, cy, r):
            return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2
        
        if any(in_circle(0, 0, cx, cy, r) or in_circle(X, Y, cx, cy, r) for cx, cy, r in circles):
            return False
            
        m = len(circles)
        # Node m: Top border (y=Y) or Left border (x=0)
        # Node m+1: Bottom border (y=0) or Right border (x=X)
        adj = [[] for _ in range(m + 2)]
        
        for i in range(m):
            x1, y1, r1 = circles[i]
            # Connect to Top or Left
            if x1 - r1 <= 0 or y1 + r1 >= Y:
                adj[i].append(m)
                adj[m].append(i)
            # Connect to Bottom or Right
            if y1 - r1 <= 0 or x1 + r1 >= X:
                adj[i].append(m + 1)
                adj[m + 1].append(i)
                
            for j in range(i + 1, m):
                x2, y2, r2 = circles[j]
                if (x1 - x2) ** 2 + (y1 - y2) ** 2 <= (r1 + r2) ** 2:
                    # Check if intersection contains points within rectangle bounding region
                    adj[i].append(j)
                    adj[j].append(i)
                    
        # Check if border m and m+1 are connected
        vis = [False] * (m + 2)
        queue = [m]
        vis[m] = True
        for u in queue:
            if u == m + 1:
                return False
            for v in adj[u]:
                if not vis[v]:
                    vis[v] = True
                    queue.append(v)
        return True
