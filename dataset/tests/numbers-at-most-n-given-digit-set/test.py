from typing import List

class Solution:
    def atMostNGivenDigitSet(self, digits: List[str], n: int) -> int:
        s = str(n)
        k = len(s)
        m = len(digits)
        ans = sum(m ** i for i in range(1, k))

        for i, ch in enumerate(s):
            smaller = sum(d < ch for d in digits)
            ans += smaller * (m ** (k - 1 - i))
            if ch not in digits:
                return ans
        return ans + 1

def test():
    sol = Solution()
    assert sol.atMostNGivenDigitSet(["1", "3", "5", "7"], 100) == 20, "test 1 failed"
    assert sol.atMostNGivenDigitSet(["1", "4", "9"], 1000000000) == 29523, "test 2 failed"
    assert sol.atMostNGivenDigitSet(["7"], 8) == 1, "test 3 failed"
    print("✓ numbers-at-most-n-given-digit-set passed")

if __name__ == "__main__":
    test()
