from collections import Counter
from typing import List

class Solution:
    def countTriplets(self, nums: List[int]) -> int:
        pair_counts = Counter(x & y for x in nums for y in nums)
        res = 0
        for z in nums:
            for pair_and, cnt in pair_counts.items():
                if z & pair_and == 0:
                    res += cnt
        return res

def test():
    sol = Solution()
    assert sol.countTriplets([2, 1, 3]) == 12, "test 1 failed"
    assert sol.countTriplets([0, 0, 0]) == 27, "test 2 failed"
    print("✓ triples-with-bitwise-and-equal-to-zero passed")

if __name__ == "__main__":
    test()
