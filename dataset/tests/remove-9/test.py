class Solution:
    def newInteger(self, n: int) -> int:
        digits = []
        while n > 0:
            digits.append(str(n % 9))
            n //= 9
        return int("".join(reversed(digits)))

def test():
    sol = Solution()
    assert sol.newInteger(9) == 10, "test 1 failed"
    assert sol.newInteger(1) == 1, "test 2 failed"
    assert sol.newInteger(8) == 8, "test 3 failed"
    print("✓ remove-9 passed")

if __name__ == "__main__":
    test()
