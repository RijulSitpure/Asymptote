class Solution:
    def smallestTrimmedNumbers(self, nums: list[str], queries: list[list[int]]) -> list[int]:
        ans = []
        for k, trim in queries:
            trimmed = [(num[-trim:], i) for i, num in enumerate(nums)]
            trimmed.sort()
            ans.append(trimmed[k - 1][1])
        return ans
