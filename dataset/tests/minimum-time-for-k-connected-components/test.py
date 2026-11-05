from typing import List

class Solution:
    def minTimeForKComponents(self, n: int, edges: List[List[int]], k: int) -> int:
        # edges[i] = [u, v, t]
        if n <= k:
            return 0
            
        sorted_edges = sorted(edges, key=lambda x: x[2])
        parent = list(range(n))
        
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
            
        def union(x: int, y: int) -> bool:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
                return True
            return False

        components = n
        for u, v, t in sorted_edges:
            if union(u, v):
                components -= 1
                if components <= k:
                    return t
                    
        return -1

def run_tests():
    s = Solution()
    res1 = s.minTimeForKComponents(4, [[0, 1, 1], [2, 3, 2], [1, 2, 5]], 2)
    assert res1 == 2, f"Expected 2, got {res1}" # after adding edge at t=1 and t=2, components = 2
    res2 = s.minTimeForKComponents(3, [[0, 1, 10]], 2)
    assert res2 == 10, f"Expected 10, got {res2}"
    print("3608 minimum-time-for-k-connected-components PASSED")

if __name__ == "__main__":
    run_tests()
