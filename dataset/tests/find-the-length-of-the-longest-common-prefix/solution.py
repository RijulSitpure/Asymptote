class Solution:
    def longestCommonPrefix(self, arr1: list[int], arr2: list[int]) -> int:
        prefixes = set()
        for x in arr1:
            s = str(x)
            for l in range(1, len(s) + 1):
                prefixes.add(s[:l])
        ans = 0
        for y in arr2:
            s = str(y)
            for l in range(len(s), 0, -1):
                if s[:l] in prefixes:
                    ans = max(ans, l)
                    break
        return ans
