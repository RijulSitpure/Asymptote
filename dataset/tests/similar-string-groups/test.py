from typing import List

class Solution:
    def numSimilarGroups(self, strs: List[str]) -> int:
        n = len(strs)
        parent = list(range(n))

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(x: int, y: int) -> None:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry

        def similar(s1: str, s2: str) -> bool:
            diff = 0
            for c1, c2 in zip(s1, s2):
                if c1 != c2:
                    diff += 1
                    if diff > 2:
                        return False
            return diff in (0, 2)

        for i in range(n):
            for j in range(i + 1, n):
                if similar(strs[i], strs[j]):
                    union(i, j)

        return sum(1 for i in range(n) if find(i) == i)

def test():
    sol = Solution()
    assert sol.numSimilarGroups(["tars", "rats", "arts", "star"]) == 2, "test 1 failed"
    assert sol.numSimilarGroups(["omv", "ovm"]) == 1, "test 2 failed"
    print("✓ similar-string-groups passed")

if __name__ == "__main__":
    test()
