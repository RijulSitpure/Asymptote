class Solution:
    def removePalindromeSub(self, s: str) -> int:
        if not s:
            return 0
        return 1 if s == s[::-1] else 2

def test():
    sol = Solution()
    assert sol.removePalindromeSub("ababa") == 1, "test 1 failed"
    assert sol.removePalindromeSub("abb") == 2, "test 2 failed"
    assert sol.removePalindromeSub("baabb") == 2, "test 3 failed"
    print("✓ remove-palindromic-subsequences passed")

if __name__ == "__main__":
    test()
