import sys

class Solution:
    def countDigitOne(self, n: int) -> int:
        count = 0
        m = 1
        while m <= n:
            higher = n // (m * 10)
            cur = (n // m) % 10
            lower = n % m
            if cur == 0:
                count += higher * m
            elif cur == 1:
                count += higher * m + lower + 1
            else:
                count += (higher + 1) * m
            m *= 10
        return count

def test():
    sol = Solution()
    assert sol.countDigitOne(13) == 6, "test 1 failed"
    assert sol.countDigitOne(0) == 0, "test 2 failed"
    print("✓ number-of-digit-one passed")

if __name__ == "__main__":
    test()
