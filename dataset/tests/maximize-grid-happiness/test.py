from functools import lru_cache

class Solution:
    def getMaxGridHappiness(self, m: int, n: int, introvertsCount: int, extrovertsCount: int) -> int:
        if m < n:
            m, n = n, m
        total_cells = m * n

        @lru_cache(maxsize=None)
        def dp(pos: int, ic: int, ec: int, profile: tuple) -> int:
            if pos == total_cells or (ic == 0 and ec == 0):
                return 0
            r, c = divmod(pos, n)
            up = profile[0]
            left = profile[-1] if c > 0 else 0

            # 1. Leave cell empty
            ans = dp(pos + 1, ic, ec, profile[1:] + (0,))

            # 2. Place Introvert (1)
            if ic > 0:
                cost = 120
                if up == 1: cost -= 60
                elif up == 2: cost -= 10
                if left == 1: cost -= 60
                elif left == 2: cost -= 10
                ans = max(ans, cost + dp(pos + 1, ic - 1, ec, profile[1:] + (1,)))

            # 3. Place Extrovert (2)
            if ec > 0:
                cost = 40
                if up == 1: cost -= 10
                elif up == 2: cost += 40
                if left == 1: cost -= 10
                elif left == 2: cost += 40
                ans = max(ans, cost + dp(pos + 1, ic, ec - 1, profile[1:] + (2,)))

            return ans

        init_profile = tuple([0] * n)
        return dp(0, introvertsCount, extrovertsCount, init_profile)

def test():
    sol = Solution()
    assert sol.getMaxGridHappiness(2, 3, 1, 2) == 240
    assert sol.getMaxGridHappiness(3, 1, 2, 1) == 260
    assert sol.getMaxGridHappiness(2, 2, 4, 0) == 240

    print("✓ maximize-grid-happiness passed")

if __name__ == '__main__':
    test()
