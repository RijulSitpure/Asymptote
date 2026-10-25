class Solution:
    def findMinFibonacciNumbers(self, k: int) -> int:
        fib = [1, 1]
        while fib[-1] < k:
            fib.append(fib[-1] + fib[-2])
        count = 0
        for f in reversed(fib):
            if k >= f:
                k -= f
                count += 1
            if k == 0:
                break
        return count

def test():
    sol = Solution()
    assert sol.findMinFibonacciNumbers(7) == 2, "test 1 failed"
    assert sol.findMinFibonacciNumbers(10) == 2, "test 2 failed"
    assert sol.findMinFibonacciNumbers(19) == 3, "test 3 failed"
    print("✓ find-the-minimum-number-of-fibonacci-numbers-whose-sum-is-k passed")

if __name__ == "__main__":
    test()
