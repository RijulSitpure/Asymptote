import bisect

class Solution:
    def countElementsWithKGreater(self, nums: list[int], k: int) -> int:
        sorted_nums = sorted(nums)
        n = len(nums)
        count = 0
        for x in nums:
            # First element strictly greater than x
            idx = bisect.bisect_right(sorted_nums, x)
            strictly_greater = n - idx
            if strictly_greater >= k:
                count += 1
        return count

def run_tests():
    sol = Solution()
    assert sol.countElementsWithKGreater([3, 1, 2, 4, 5], 2) == 3 # 1, 2, 3 have >= 2 greater
    assert sol.countElementsWithKGreater([2, 2, 2], 1) == 0 # none has strictly greater
    assert sol.countElementsWithKGreater([1, 2], 1) == 1 # 1 has 2
    print("All tests passed for 3759.")

if __name__ == "__main__":
    run_tests()