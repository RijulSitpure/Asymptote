class Solution:
    def largestPalindrome(self, n: int) -> int:
        if n == 1:
            return 9
        upper = 10**n - 1
        lower = 10**(n - 1)

        for left in range(upper, lower - 1, -1):
            s = str(left)
            pal = int(s + s[::-1])
            factor = upper
            while factor * factor >= pal:
                if pal % factor == 0 and lower <= pal // factor <= upper:
                    return pal % 1337
                factor -= 1

        return 0

def test():
    sol = Solution()
    assert sol.largestPalindrome(1) == 9, "test 1 failed"
    assert sol.largestPalindrome(2) == 987, "test 2 failed"
    print("✓ largest-palindrome-product passed")

if __name__ == "__main__":
    test()
