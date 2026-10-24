class Solution:
    def digitsCount(self, d: int, low: int, high: int) -> int:
        def countDigit(n: int) -> int:
            if n < 0:
                return 0
            count = 0
            m = 1
            while m <= n:
                a = n // (m * 10)
                cur = (n // m) % 10
                b = n % m
                if d == 0:
                    if a > 0:
                        count += (a - 1) * m
                        if cur == 0:
                            count += b + 1
                        else:
                            count += m
                else:
                    count += a * m
                    if cur == d:
                        count += b + 1
                    elif cur > d:
                        count += m
                m *= 10
            return count

        return countDigit(high) - countDigit(low - 1)

def test():
    sol = Solution()
    assert sol.digitsCount(1, 1, 13) == 6, "test 1 failed"
    assert sol.digitsCount(3, 100, 250) == 35, "test 2 failed"
    print("✓ digit-count-in-range passed")

if __name__ == "__main__":
    test()
