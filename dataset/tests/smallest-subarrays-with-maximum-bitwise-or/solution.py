class Solution:
    def smallestSubarrays(self, nums: list[int]) -> list[int]:
        n = len(nums)
        ans = [1] * n
        last_pos = [-1] * 30
        
        for i in range(n - 1, -1, -1):
            for b in range(30):
                if (nums[i] >> b) & 1:
                    last_pos[b] = i
            furthest = i
            for b in range(30):
                if last_pos[b] != -1:
                    furthest = max(furthest, last_pos[b])
            ans[i] = furthest - i + 1
        return ans
