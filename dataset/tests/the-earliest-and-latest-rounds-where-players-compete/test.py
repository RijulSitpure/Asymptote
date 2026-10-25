from functools import lru_cache

class Solution:
    def earliestAndLatest(self, n: int, firstPlayer: int, secondPlayer: int) -> list[int]:
        @lru_cache(None)
        def dp(m: int, p1: int, p2: int):
            if p1 + p2 == m + 1:
                return (1, 1)
            if p1 > p2:
                p1, p2 = p2, p1
            if p1 > m - p2 + 1:
                p1, p2 = m - p2 + 1, m - p1 + 1

            min_r = float('inf')
            max_r = float('-inf')

            p2_mirror = m - p2 + 1
            if p2 <= (m + 1) // 2:
                c1 = p1 - 1
                c2 = p2 - p1 - 1
                for i in range(c1 + 1):
                    for j in range(c2 + 1):
                        next_p1 = i + 1
                        next_p2 = i + 1 + j + 1
                        mn, mx = dp((m + 1) // 2, next_p1, next_p2)
                        min_r = min(min_r, 1 + mn)
                        max_r = max(max_r, 1 + mx)
            else:
                mid_survivors = (p2 - p2_mirror) // 2
                c1 = p1 - 1
                c2 = p2_mirror - p1 - 1
                for i in range(c1 + 1):
                    for j in range(c2 + 1):
                        next_p1 = i + 1
                        next_p2 = i + 1 + j + 1 + mid_survivors
                        mn, mx = dp((m + 1) // 2, next_p1, next_p2)
                        min_r = min(min_r, 1 + mn)
                        max_r = max(max_r, 1 + mx)

            return (min_r, max_r)

        res = dp(n, firstPlayer, secondPlayer)
        return [res[0], res[1]]

def test():
    sol = Solution()
    assert sol.earliestAndLatest(11, 2, 4) == [3, 4]
    assert sol.earliestAndLatest(5, 1, 5) == [1, 1]

if __name__ == '__main__':
    test()
