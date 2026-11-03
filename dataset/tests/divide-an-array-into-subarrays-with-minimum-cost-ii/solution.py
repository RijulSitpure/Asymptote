import bisect

class Solution:
    def minimumCost(self, nums: list[int], k: int, dist: int) -> int:
        k -= 1
        window = sorted(nums[1:dist + 2])
        cur_sum = sum(window[:k])
        ans = cur_sum
        for i in range(dist + 2, len(nums)):
            out_val = nums[i - dist - 1]
            idx = bisect.bisect_left(window, out_val)
            window.pop(idx)
            in_val = nums[i]
            bisect.insort(window, in_val)
            cur_sum = sum(window[:k])
            ans = min(ans, cur_sum)
        return nums[0] + ans
