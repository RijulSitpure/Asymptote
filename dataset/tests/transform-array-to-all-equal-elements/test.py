from typing import List

class Solution:
    def canTransform(self, nums: List[int], k: int) -> bool:
        count_pos = sum(1 for x in nums if x == 1)
        count_neg = sum(1 for x in nums if x == -1)
        # Min flips to make all 1 is count_neg, to make all -1 is count_pos
        return min(count_pos, count_neg) <= k

def run_tests():
    s = Solution()
    res1 = s.canTransform([1, -1, 1, 1], 1)
    assert res1 is True, f"Expected True, got {res1}"
    res2 = s.canTransform([1, -1, -1, 1], 1)
    assert res2 is False, f"Expected False, got {res2}"
    print("3576 transform-array-to-all-equal-elements PASSED")

if __name__ == "__main__":
    run_tests()
