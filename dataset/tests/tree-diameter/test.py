from collections import defaultdict, deque

class Solution:
    def treeDiameter(self, edges: list[list[int]]) -> int:
        if not edges:
            return 0
        adj = defaultdict(list)
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
            
        def bfs(start):
            dist = {start: 0}
            q = deque([start])
            furthest_node, max_dist = start, 0
            while q:
                curr = q.popleft()
                d = dist[curr]
                if d > max_dist:
                    max_dist = d
                    furthest_node = curr
                for neighbor in adj[curr]:
                    if neighbor not in dist:
                        dist[neighbor] = d + 1
                        q.append(neighbor)
            return furthest_node, max_dist
            
        endpoint_a, _ = bfs(0)
        _, diameter = bfs(endpoint_a)
        return diameter

def test():
    sol = Solution()
    assert sol.treeDiameter([[0,1],[0,2]]) == 2, "test 1 failed"
    assert sol.treeDiameter([[0,1],[1,2],[2,3],[1,4],[4,5]]) == 4, "test 2 failed"
    print("✓ tree-diameter passed")

if __name__ == "__main__":
    test()
