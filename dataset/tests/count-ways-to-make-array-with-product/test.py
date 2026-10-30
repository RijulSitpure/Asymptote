import math

class Solution:
    def waysToFillArray(self, queries: list[list[int]]) -> list[int]:
        MOD = 10**9 + 7
        ans = []
        for n, k in queries:
            res = 1
            d = 2
            while d * d <= k:
                if k % d == 0:
                    cnt = 0
                    while k % d == 0:
                        cnt += 1
                        k //= d
                    res = (res * math.comb(cnt + n - 1, cnt)) % MOD
                d += 1
            if k > 1:
                res = (res * math.comb(1 + n - 1, 1)) % MOD
            ans.append(res)
        return ans

sol = Solution()
assert sol.waysToFillArray([[2,6],[5,1],[73,660]]) == [4, 1, 50734910]
print("All tests passed successfully.")
