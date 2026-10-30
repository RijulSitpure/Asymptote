class Solution:
    def getSubarrayBeauty(self, nums: list[int], k: int, x: int) -> list[int]:
        count = [0] * 101
        ans = []
        for i, val in enumerate(nums):
            count[val + 50] += 1
            if i >= k:
                count[nums[i - k] + 50] -= 1
            if i >= k - 1:
                seen = 0
                beauty = 0
                for v in range(-50, 0):
                    seen += count[v + 50]
                    if seen >= x:
                        beauty = v
                        break
                ans.append(beauty)
        return ans
