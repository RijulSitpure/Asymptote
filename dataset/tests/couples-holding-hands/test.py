from typing import List

class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        n = len(row) // 2
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

        for i in range(0, len(row), 2):
            union(row[i] // 2, row[i + 1] // 2)

        components = sum(1 for i in range(n) if find(i) == i)
        return n - components

def test():
    sol = Solution()
    assert sol.minSwapsCouples([0, 2, 1, 3]) == 1, "test 1 failed"
    assert sol.minSwapsCouples([3, 2, 0, 1]) == 0, "test 2 failed"
    print("✓ couples-holding-hands passed")

if __name__ == "__main__":
    test()
