class Solution:
    def checkPalindromeFormation(self, a: str, b: str) -> bool:
        def is_pal(s: str, i: int, j: int) -> bool:
            while i < j:
                if s[i] != s[j]:
                    return False
                i += 1
                j -= 1
            return True

        def check(s1: str, s2: str) -> bool:
            i, j = 0, len(s1) - 1
            while i < j and s1[i] == s2[j]:
                i += 1
                j -= 1
            if i >= j:
                return True
            return is_pal(s1, i, j) or is_pal(s2, i, j)

        return check(a, b) or check(b, a)

def test():
    sol = Solution()
    assert sol.checkPalindromeFormation("x", "y") == True
    assert sol.checkPalindromeFormation("abda", "acmc") == False
    assert sol.checkPalindromeFormation("ulacfd", "jizalu") == True

    print("✓ split-two-strings-to-make-palindrome passed")

if __name__ == '__main__':
    test()
