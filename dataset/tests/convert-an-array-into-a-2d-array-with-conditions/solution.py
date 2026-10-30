class Solution:
    def findMatrix(self, nums: list[int]) -> list[list[int]]:
        from collections import defaultdict
        count = defaultdict(int)
        res = []
        for x in nums:
            r = count[x]
            if r == len(res):
                res.append([])
            res[r].append(x)
            count[x] += 1
        return res
