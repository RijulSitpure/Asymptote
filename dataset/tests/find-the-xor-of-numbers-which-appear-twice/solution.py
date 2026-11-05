class Solution:
    def duplicateNumbersXOR(self, nums: list[int]) -> int:
        seen = set()
        ans = 0
        for x in nums:
            if x in seen:
                ans ^= x
            else:
                seen.add(x)
        return ans