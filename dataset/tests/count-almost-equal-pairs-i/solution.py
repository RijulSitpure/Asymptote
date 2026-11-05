class Solution:
    def countPairs(self, nums: list[int]) -> int:
        def check(x, y):
            sx = str(x)
            sy = str(y)
            max_len = max(len(sx), len(sy))
            sx = sx.zfill(max_len)
            sy = sy.zfill(max_len)
            diffs = []
            for i in range(max_len):
                if sx[i] != sy[i]:
                    diffs.append(i)
            if len(diffs) == 0:
                return True
            if len(diffs) == 2:
                i, j = diffs
                return sx[i] == sy[j] and sx[j] == sy[i]
            return False
            
        ans = 0
        n = len(nums)
        for i in range(n):
            for j in range(i + 1, n):
                if check(nums[i], nums[j]):
                    ans += 1
        return ans
