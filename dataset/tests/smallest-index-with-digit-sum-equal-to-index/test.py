from typing import List

class Solution:
    def smallestIndex(self, nums: List[int]) -> int:
        for i, x in enumerate(nums):
            if sum(int(d) for d in str(x)) == i:
                return i
        return -1

def run_tests():
    s = Solution()
    res = s.smallestIndex([10, 2, 3])
    assert res == -1, f"Expected -1, got {res}"
    print("3550 smallest-index-with-digit-sum-equal-to-index PASSED")

if __name__ == "__main__":
    run_tests()
