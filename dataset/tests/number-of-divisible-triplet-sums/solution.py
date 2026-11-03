class Solution:
    def divisibleTripletCount(self, nums: list[int], d: int) -> int:
        from collections import defaultdict
        count = defaultdict(int)
        ans = 0
        n = len(nums)
        for j in range(n):
            for k in range(j + 1, n):
                rem = (d - (nums[j] + nums[k]) % d) % d
                ans += count[rem]
            count[nums[j] % d] += 1
        return ans
