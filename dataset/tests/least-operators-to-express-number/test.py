import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'least-operators-to-express-number.json')

import functools

class Solution:
    def leastOpsExpressTarget(self, x: int, target: int) -> int:
        @functools.lru_cache(None)
        def dp(t):
            if t < x:
                return min(2 * t - 1, 2 * (x - t))
            k = 0
            p = 1
            while p * x <= t:
                p *= x
                k += 1
            if t == p:
                return k - 1
            ans = dp(t - p) + k
            if p * x - t < t:
                ans = min(ans, dp(p * x - t) + k + 1)
            return ans

        return dp(target)

sol = Solution()
assert sol.leastOpsExpressTarget(3, 19) == 5
assert sol.leastOpsExpressTarget(5, 501) == 8
assert sol.leastOpsExpressTarget(100, 100000000) == 3
print("✓ least-operators-to-express-number passed")
