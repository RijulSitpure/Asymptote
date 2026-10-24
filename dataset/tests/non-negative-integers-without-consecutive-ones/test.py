import sys

class Solution:
    def findIntegers(self, n: int) -> int:
        fib = [0] * 32
        fib[0] = 1
        fib[1] = 2
        for i in range(2, 32):
            fib[i] = fib[i - 1] + fib[i - 2]

        ans = 0
        prev_bit = 0
        for i in range(30, -1, -1):
            if (n & (1 << i)) != 0:
                ans += fib[i]
                if prev_bit == 1:
                    return ans
                prev_bit = 1
            else:
                prev_bit = 0

        return ans + 1

def test():
    sol = Solution()
    assert sol.findIntegers(5) == 5, "test 1 failed"
    assert sol.findIntegers(1) == 2, "test 2 failed"
    assert sol.findIntegers(2) == 3, "test 3 failed"
    print("✓ non-negative-integers-without-consecutive-ones passed")

if __name__ == "__main__":
    test()
