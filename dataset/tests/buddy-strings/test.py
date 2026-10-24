class Solution:
    def buddyStrings(self, s: str, goal: str) -> bool:
        if len(s) != len(goal):
            return False
        if s == goal:
            return len(set(s)) < len(s)
        diff = []
        for i in range(len(s)):
            if s[i] != goal[i]:
                diff.append(i)
                if len(diff) > 2:
                    return False
        return len(diff) == 2 and s[diff[0]] == goal[diff[1]] and s[diff[1]] == goal[diff[0]]

def test():
    sol = Solution()
    assert sol.buddyStrings("ab", "ba") is True, "test 1 failed"
    assert sol.buddyStrings("ab", "ab") is False, "test 2 failed"
    assert sol.buddyStrings("aa", "aa") is True, "test 3 failed"
    print("✓ buddy-strings passed")

if __name__ == "__main__":
    test()
