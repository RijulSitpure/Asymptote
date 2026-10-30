from solution import Solution

s = Solution()
assert s.longestPalindrome(["lc","cl","gg"]) == 6
assert s.longestPalindrome(["ab","ty","yt","lc","cl","ab"]) == 8
assert s.longestPalindrome(["cc","ll","xx"]) == 2
print("All tests passed for longest-palindrome-by-concatenating-two-letter-words!")
