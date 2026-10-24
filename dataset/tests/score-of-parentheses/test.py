class Solution:
    def scoreOfParentheses(self, s: str) -> int:
        ans = depth = 0
        for i, ch in enumerate(s):
            if ch == '(':
                depth += 1
            else:
                depth -= 1
                if s[i - 1] == '(':
                    ans += 1 << depth
        return ans

def test():
    sol = Solution()
    assert sol.scoreOfParentheses("()") == 1, "test 1 failed"
    assert sol.scoreOfParentheses("(())") == 2, "test 2 failed"
    assert sol.scoreOfParentheses("()()") == 2, "test 3 failed"
    assert sol.scoreOfParentheses("(()(()))") == 6, "test 4 failed"
    print("✓ score-of-parentheses passed")

if __name__ == "__main__":
    test()
