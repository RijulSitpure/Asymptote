class Solution:
    def getSneakyNumbers(self, nums: list[int]) -> list[int]:
        seen = set()
        res = []
        for x in nums:
            if x in seen:
                res.append(x)
            else:
                seen.add(x)
        return res
