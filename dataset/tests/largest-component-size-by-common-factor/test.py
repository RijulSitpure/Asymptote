from collections import Counter
from typing import List

class Solution:
    def largestComponentSize(self, nums: List[int]) -> int:
        parent = {}
        def find(x: int) -> int:
            if parent.setdefault(x, x) != x:
                parent[x] = find(parent[x])
            return parent[x]
        def union(x: int, y: int):
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry
        for num in nums:
            d = 2
            val = num
            while d * d <= val:
                if val % d == 0:
                    union(num, d)
                    while val % d == 0:
                        val //= d
                d += 1
            if val > 1:
                union(num, val)
        counts = Counter(find(num) for num in nums)
        return max(counts.values())

def test():
    sol = Solution()
    assert sol.largestComponentSize([4, 6, 15, 35]) == 4, "test 1 failed"
    assert sol.largestComponentSize([20, 50, 9, 63]) == 2, "test 2 failed"
    assert sol.largestComponentSize([2, 3, 6, 7, 4, 12, 21, 39]) == 8, "test 3 failed"
    print("✓ largest-component-size-by-common-factor passed")

if __name__ == "__main__":
    test()
