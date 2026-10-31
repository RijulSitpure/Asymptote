from solution import Solution
s = Solution()
assert s.makeSmallestPalindrome('egcfe') == 'efcfe'
assert s.makeSmallestPalindrome('abcd') == 'abba'
assert s.makeSmallestPalindrome('seven') == 'neven'
print('All tests passed for lexicographically-smallest-palindrome!')
