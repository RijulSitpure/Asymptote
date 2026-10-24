class Solution:
    def smallestFactorization(self, num: int) -> int:
        if num < 2:
            return num
        digits = []
        for d in range(9, 1, -1):
            while num % d == 0:
                digits.append(d)
                num //= d

        if num > 1:
            return 0
        val = int("".join(map(str, reversed(digits))))
        return val if val <= 2**31 - 1 else 0

def test():
    sol = Solution()
    assert sol.smallestFactorization(48) == 68, "test 1 failed"
    assert sol.smallestFactorization(15) == 35, "test 2 failed"
    assert sol.smallestFactorization(11) == 0, "test 3 failed"
    print("✓ minimum-factorization passed")

if __name__ == "__main__":
    test()
