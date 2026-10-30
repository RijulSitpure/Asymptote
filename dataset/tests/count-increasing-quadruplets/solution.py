class Solution:
    def countQuadruplets(self, nums: list[int]) -> int:
        n = len(nums)
        cnt = [0] * (n + 1)
        ans = 0
        for j in range(n):
            greater = 0
            for k in range(n - 1, j, -1):
                if nums[k] < nums[j]:
                    ans += cnt[nums[k]] * greater
                elif nums[k] > nums[j]:
                    greater += 1
            for x in range(nums[j] + 1, n + 1):
                cnt[x] += 1
        return ans
