import sys

class Solution:
    def findContestMatch(self, n: int) -> str:
        matches = [str(i) for i in range(1, n + 1)]
        while n > 1:
            for i in range(n // 2):
                matches[i] = f"({matches[i]},{matches[n - 1 - i]})"
            n //= 2
        return matches[0]

def test():
    sol = Solution()
    assert sol.findContestMatch(4) == "((1,4),(2,3))", "test 1 failed"
    assert sol.findContestMatch(8) == "(((1,8),(4,5)),((2,7),(3,6)))", "test 2 failed"
    print("✓ output-contest-matches passed")

if __name__ == "__main__":
    test()
