from typing import List

class Solution:
    def removeStones(self, stones: List[List[int]]) -> int:
        parent = {}
        def find(x: int) -> int:
            if parent.setdefault(x, x) != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x: int, y: int):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
        for r, c in stones:
            union(r, ~c)
        components = {find(x) for x in parent}
        return len(stones) - len(components)

def test():
    sol = Solution()
    s1 = [[0,0],[0,1],[1,0],[1,2],[2,1],[2,2]]
    assert sol.removeStones(s1) == 5, "test 1 failed"
    s2 = [[0,0],[0,2],[1,1],[2,0],[2,2]]
    assert sol.removeStones(s2) == 3, "test 2 failed"
    s3 = [[0,0]]
    assert sol.removeStones(s3) == 0, "test 3 failed"
    print("✓ most-stones-removed-with-same-row-or-column passed")

if __name__ == "__main__":
    test()
