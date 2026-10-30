from collections import defaultdict

class Solution:
    def countSubarrays(self, nums: list[int], k: int) -> int:
        pos = nums.index(k)
        n = len(nums)
        right_counts = defaultdict(int)
        cur = 0
        for i in range(pos, n):
            if nums[i] > k:
                cur += 1
            elif nums[i] < k:
                cur -= 1
            right_counts[cur] += 1
        cur = 0
        ans = 0
        for i in range(pos, -1, -1):
            if nums[i] > k:
                cur += 1
            elif nums[i] < k:
                cur -= 1
            ans += right_counts[-cur] + right_counts[1 - cur]
        return ans
