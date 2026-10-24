import sys
from typing import List

class Solution:
    def numIslands2(self, m: int, n: int, positions: List[List[int]]) -> List[int]:
        parent = {}

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> bool:
            rx, ry = find(x), find(y)
            if rx == ry:
                return False
            parent[rx] = ry
            return True

        res = []
        count = 0
        dirs = [(-1, 0), (1, 0), (0, -1), (0, 1)]

        for r, c in positions:
            key = r * n + c
            if key in parent:
                res.append(count)
                continue
            parent[key] = key
            count += 1
            for dr, dc in dirs:
                nr, nc = r + dr, c + dc
                nkey = nr * n + nc
                if 0 <= nr < m and 0 <= nc < n and nkey in parent:
                    if union(key, nkey):
                        count -= 1
            res.append(count)

        return res

def test():
    sol = Solution()
    p1 = [[0,0],[0,1],[1,2],[2,1]]
    assert sol.numIslands2(3, 3, p1) == [1, 1, 2, 3], "test 1 failed"
    p2 = [[0,0],[0,1],[1,2],[1,2]]
    assert sol.numIslands2(3, 3, p2) == [1, 1, 2, 2], "test 2 failed"
    print("✓ number-of-islands-ii passed")

if __name__ == "__main__":
    test()
