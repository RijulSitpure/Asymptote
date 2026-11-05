class Solution:
    def minBitwiseArray(self, nums: list[int]) -> list[int]:
        ans = []
        for p in nums:
            if p == 2:
                ans.append(-1)
                continue
            # Find the lowest unset bit
            for i in range(32):
                if not (p & (1 << i)):
                    ans.append(p ^ (1 << (i - 1)))
                    break
        return ans
