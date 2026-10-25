import bisect

class Solution:
    def minAbsDifference(self, nums: list[int], goal: int) -> int:
        n = len(nums)
        mid = n // 2
        left_nums = nums[:mid]
        right_nums = nums[mid:]

        def get_sums(arr: list[int]) -> list[int]:
            sums = [0]
            for x in arr:
                sums += [s + x for s in sums]
            return sums

        left_sums = get_sums(left_nums)
        right_sums = sorted(get_sums(right_nums))

        ans = float('inf')
        m = len(right_sums)
        for s in left_sums:
            target = goal - s
            idx = bisect.bisect_left(right_sums, target)
            if idx < m:
                ans = min(ans, abs(s + right_sums[idx] - goal))
            if idx > 0:
                ans = min(ans, abs(s + right_sums[idx - 1] - goal))
            if ans == 0:
                return 0
        return ans

def test():
    sol = Solution()
    assert sol.minAbsDifference([5,-7,3,5], 6) == 0
    assert sol.minAbsDifference([7,-9,15,-2], -5) == 1
    assert sol.minAbsDifference([1,2,3], -7) == 7

    print("✓ closest-subsequence-sum passed")

if __name__ == '__main__':
    test()
