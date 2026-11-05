from typing import List

class Solution:
    def maxStability(self, n: int, edges: List[List[int]], k: int) -> int:
        # edges[i] = [u, v, w]
        # Upgrading doubles an edge weight: 2 * w
        # Check if threshold S is achievable with at most k upgrades
        def check(S: int) -> bool:
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
            # 1. Add edges where w >= S (0 upgrades needed)
            for u, v, w in edges:
                if w >= S:
                    if union(u, v):
                        components -= 1
                        
            # 2. Add upgradeable edges where 2 * w >= S (1 upgrade needed)
            upgrades_used = 0
            for u, v, w in edges:
                if w < S and 2 * w >= S:
                    if union(u, v):
                        upgrades_used += 1
                        components -= 1
                        if upgrades_used > k:
                            return False
                            
            return components == 1 and upgrades_used <= k

        low = 1
        high = max(2 * w for _, _, w in edges) if edges else 0
        ans = 0
        
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
                
        return ans

def run_tests():
    s = Solution()
    res1 = s.maxStability(3, [[0, 1, 2], [1, 2, 3], [0, 2, 1]], 1)
    assert res1 == 3, f"Expected 3, got {res1}" # upgrade edge (0,1) from 2 to 4, edge (1,2) has 3 -> min weight 3
    res2 = s.maxStability(2, [[0, 1, 5]], 0)
    assert res2 == 5, f"Expected 5, got {res2}"
    print("3600 maximize-spanning-tree-stability-with-upgrades PASSED")

if __name__ == "__main__":
    run_tests()
