class Solution:
    def longestCommonSubpath(self, n: int, paths: list[list[int]]) -> int:
        low = 1
        high = min(len(p) for p in paths)
        BASE1, MOD1 = 100003, 10**9 + 7
        BASE2, MOD2 = 100019, 10**9 + 9

        def check(L):
            b1_pow = pow(BASE1, L, MOD1)
            b2_pow = pow(BASE2, L, MOD2)

            common = None
            for p in paths:
                h1, h2 = 0, 0
                for i in range(L):
                    h1 = (h1 * BASE1 + p[i]) % MOD1
                    h2 = (h2 * BASE2 + p[i]) % MOD2
                seen = {(h1, h2)}
                for i in range(L, len(p)):
                    h1 = (h1 * BASE1 + p[i] - p[i - L] * b1_pow) % MOD1
                    h2 = (h2 * BASE2 + p[i] - p[i - L] * b2_pow) % MOD2
                    seen.add((h1, h2))
                if common is None:
                    common = seen
                else:
                    common &= seen
                if not common:
                    return False
            return len(common) > 0

        ans = 0
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                low = mid + 1
            else:
                high = mid - 1
        return ans

def test_longest_common_subpath():
    sol = Solution()
    assert sol.longestCommonSubpath(5, [[0, 1, 2, 3, 4], [2, 3, 4], [4, 0, 1, 2, 3]]) == 2
    assert sol.longestCommonSubpath(3, [[0], [1], [2]]) == 0
    assert sol.longestCommonSubpath(5, [[0, 1, 2, 3, 4], [4, 3, 2, 1, 0]]) == 1

