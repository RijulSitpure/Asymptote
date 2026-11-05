from typing import List

class Solution:
    def maintenanceImpact(self, n: int, edges: List[List[int]], maintenance: List[int]) -> List[int]:
        # Count connected components when edge at maintenance[i] is temporarily removed
        ans = []
        for remove_idx in maintenance:
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

            comps = n
            for i, (u, v) in enumerate(edges):
                if i != remove_idx:
                    if union(u, v):
                        comps -= 1
            ans.append(comps)
        return ans

def run_tests():
    s = Solution()
    res1 = s.maintenanceImpact(3, [[0, 1], [1, 2]], [0, 1])
    assert res1 == [2, 2], f"Expected [2, 2], got {res1}" # removing bridge disconnects line into 2 components
    res2 = s.maintenanceImpact(3, [[0, 1], [1, 2], [0, 2]], [0])
    assert res2 == [1], f"Expected [1], got {res2}" # cycle remains connected
    print("3607 power-grid-maintenance PASSED")

if __name__ == "__main__":
    run_tests()
