class Solution:
    def breakPalindrome(self, palindrome: str) -> str:
        if len(palindrome) <= 1:
            return ""
        chars = list(palindrome)
        for i in range(len(chars) // 2):
            if chars[i] != "a":
                chars[i] = "a"
                return "".join(chars)
        chars[-1] = "b"
        return "".join(chars)

def test():
    sol = Solution()
    assert sol.breakPalindrome("abccba") == "aaccba", "test 1 failed"
    assert sol.breakPalindrome("a") == "", "test 2 failed"
    print("✓ break-a-palindrome passed")

if __name__ == "__main__":
    test()
