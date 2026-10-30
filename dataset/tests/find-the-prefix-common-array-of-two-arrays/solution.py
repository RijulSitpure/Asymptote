class Solution:
    def findThePrefixCommonArray(self, A: list[int], B: list[int]) -> list[int]:
        n = len(A)
        count = [0] * (n + 1)
        common = 0
        ans = []
        for x, y in zip(A, B):
            count[x] += 1
            if count[x] == 2:
                common += 1
            count[y] += 1
            if count[y] == 2:
                common += 1
            ans.append(common)
        return ans
