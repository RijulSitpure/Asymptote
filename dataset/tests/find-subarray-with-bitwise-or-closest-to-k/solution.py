class Solution:
    def minimumDifference(self, nums: list[int], k: int) -> int:
        ans = float('inf')
        prev_ors = set()
        for x in nums:
            cur_ors = {x | v for v in prev_ors} | {x}
            for v in cur_ors:
                ans = min(ans, abs(v - k))
            if ans == 0:
                return 0
            prev_ors = cur_ors
        return ans