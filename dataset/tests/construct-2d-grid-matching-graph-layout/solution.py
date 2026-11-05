class Solution:
    def constructGridLayout(self, n: int, edges: list[list[int]]) -> list[list[int]]:
        from collections import defaultdict
        
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        deg = {i: len(adj[i]) for i in range(n)}
        min_d = min(deg.values())
        
        # Corner starting node has minimum degree (1 for 1xN, 2 for MxN)
        corners = [i for i in range(n) if deg[i] == min_d]
        start = corners[0]
        
        # Reconstruct first row
        row = [start]
        visited = {start}
        
        # For next element in first row, choose neighbor with smallest degree
        curr = min(adj[start], key=lambda x: deg[x])
        row.append(curr)
        visited.add(curr)
        
        while deg[curr] > min_d:
            # Pick neighbor of curr not in visited with smallest degree
            nxt = min([v for v in adj[curr] if v not in visited], key=lambda x: deg[x])
            row.append(nxt)
            visited.add(nxt)
            curr = nxt
            
        cols = len(row)
        rows = n // cols
        grid = [[0] * cols for _ in range(rows)]
        grid[0] = row
        
        for r in range(1, rows):
            for c in range(cols):
                top = grid[r - 1][c]
                for v in adj[top]:
                    if v not in visited:
                        grid[r][c] = v
                        visited.add(v)
                        break
                        
        return grid
