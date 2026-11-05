from collections import deque

class Solution:
    def isPythagoreanTree(self, n: int, edges: list[list[int]], a: int, b: int, c: int) -> bool:
        adj = [[] for _ in range(n)]
        for u, v in edges:
            adj[u].append(v)
            adj[v].append(u)
        
        def get_dist(start: int, target: int) -> int:
            dist = [-1] * n
            dist[start] = 0
            q = deque([start])
            while q:
                curr = q.popleft()
                if curr == target:
                    return dist[curr]
                for nxt in adj[curr]:
                    if dist[nxt] == -1:
                        dist[nxt] = dist[curr] + 1
                        q.append(nxt)
            return -1
        
        d1 = get_dist(a, b)
        d2 = get_dist(b, c)
        d3 = get_dist(a, c)
        
        sides = sorted([d1, d2, d3])
        if sides[0] <= 0:
            return False
        return sides[0] ** 2 + sides[1] ** 2 == sides[2] ** 2

def run_tests():
    sol = Solution()
    # In any tree, for 3 nodes, the distances along paths satisfy d(a,c) <= d(a,b) + d(b,c)
    # A path graph with distances 3, 4, 5 cannot occur without loops, so on a tree d1+d2 >= d3 with equality along path
    # If 3 nodes on a line: 1 + 2 = 3 (not pythagorean: 1+4 != 9)
    edges = [[0, 1], [1, 2], [2, 3], [3, 4]]
    assert sol.isPythagoreanTree(5, edges, 0, 2, 4) == False
    print("All tests passed for 3820.")

if __name__ == "__main__":
    run_tests()
