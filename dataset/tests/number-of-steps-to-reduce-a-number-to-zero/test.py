class Solution:
    def numberOfSteps(self, num: int) -> int:
        steps = 0
        while num > 0:
            if num % 2 == 0:
                num //= 2
            else:
                num -= 1
            steps += 1
        return steps

def test():
    sol = Solution()
    assert sol.numberOfSteps(14) == 6, "test 1 failed"
    assert sol.numberOfSteps(8) == 4, "test 2 failed"
    assert sol.numberOfSteps(123) == 12, "test 3 failed"
    print("✓ number-of-steps-to-reduce-a-number-to-zero passed")

if __name__ == "__main__":
    test()
