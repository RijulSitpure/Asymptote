class Solution:
    def balancedStringSplit(self, s: str) -> int:
        bal = 0
        ans = 0
        for ch in s:
            bal += 1 if ch == 'R' else -1
            if bal == 0:
                ans += 1
        return ans

def test():
    sol = Solution()
    assert sol.balancedStringSplit("RLRRLLRLRL") == 4, "test 1 failed"
    assert sol.balancedStringSplit("RLRRRLLRLL") == 2, "test 2 failed"
    assert sol.balancedStringSplit("LLLLRRRR") == 1, "test 3 failed"
    print("✓ split-a-string-in-balanced-strings passed")

if __name__ == "__main__":
    test()
