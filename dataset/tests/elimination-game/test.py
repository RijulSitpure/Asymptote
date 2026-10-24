import sys

class Solution:
    def lastRemaining(self, n: int) -> int:
        head = 1
        step = 1
        remaining = n
        left = True
        while remaining > 1:
            if left or remaining % 2 == 1:
                head += step
            remaining //= 2
            step *= 2
            left = not left
        return head

def test():
    sol = Solution()
    assert sol.lastRemaining(9) == 6, "test 1 failed"
    assert sol.lastRemaining(1) == 1, "test 2 failed"
    print("✓ elimination-game passed")

if __name__ == "__main__":
    test()
