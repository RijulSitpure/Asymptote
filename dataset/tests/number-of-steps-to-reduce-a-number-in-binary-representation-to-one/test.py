class Solution:
    def numSteps(self, s: str) -> int:
        steps = 0
        carry = 0
        for i in range(len(s) - 1, 0, -1):
            digit = int(s[i]) + carry
            if digit % 2 == 1:
                steps += 2
                carry = 1
            else:
                steps += 1
        return steps + carry

def test():
    sol = Solution()
    assert sol.numSteps("1101") == 6, "test 1 failed"
    assert sol.numSteps("10") == 1, "test 2 failed"
    assert sol.numSteps("1") == 0, "test 3 failed"
    print("✓ number-of-steps-to-reduce-a-number-in-binary-representation-to-one passed")

if __name__ == "__main__":
    test()
