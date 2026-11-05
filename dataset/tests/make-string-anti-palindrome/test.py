from solution import Solution

s = Solution()
res = s.makeAntiPalindrome("abccba")
assert res == "aabcbc"
assert all(res[i] != res[len(res) - 1 - i] for i in range(len(res)))
assert s.makeAntiPalindrome("aaaa") == "-1"
print("make-string-anti-palindrome tests passed!")
