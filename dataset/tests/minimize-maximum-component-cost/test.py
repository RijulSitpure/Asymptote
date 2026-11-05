from typing import List

class Solution:
    def minMaxComponentCost(self, n: int, edges: List[List[int]], k: int) -> int:
        # edges[i] = [u, v, w]
        # Remove at most k edges -> number of components can be up to k + 1
        # To minimize max edge weight inside any component, sort edges and pick (n - (k + 1)) lightest tree edges
        if k >= n - 1:
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
        target_components = k + 1
        max_cost = 0
        
        for u, v, w in sorted_edges:
            if components <= target_components:
                break
            if union(u, v):
                components -= 1
                if w > max_cost:
                    max_cost = w
                    
        return max_cost

def run_tests():
    s = Solution()
    res1 = s.minMaxComponentCost(4, [[0, 1, 1], [1, 2, 5], [2, 3, 2]], 1)
    assert res1 == 2, f"Expected 2, got {res1}" # remove edge with weight 5 -> components {0,1} (max 1), {2,3} (max 2)
    res2 = s.minMaxComponentCost(3, [[0, 1, 10], [1, 2, 20]], 2)
    assert res2 == 0, f"Expected 0, got {res2}"
    print("3613 minimize-maximum-component-cost PASSED")

if __name__ == "__main__":
    run_tests()
