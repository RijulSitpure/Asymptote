import sys

class Solution:
    def canWin(self, currentState: str) -> bool:
        memo = {}
        def dfs(s: str) -> bool:
            if s in memo:
                return memo[s]
            for i in range(len(s) - 1):
                if s[i:i+2] == "++":
                    next_state = s[:i] + "--" + s[i+2:]
                    if not dfs(next_state):
                        memo[s] = True
                        return True
            memo[s] = False
            return False
        return dfs(currentState)

def test():
    sol = Solution()
    assert sol.canWin("++++") is True, "test 1 failed"
    assert sol.canWin("+") is False, "test 2 failed"
    print("✓ flip-game-ii passed")

if __name__ == "__main__":
    test()
