from solution import Solution
s = Solution()
assert s.maxPalindromes('abaccdbbd', 3) == 2
assert s.maxPalindromes('adbcda', 2) == 0
print('All tests passed for maximum-number-of-non-overlapping-palindrome-substrings!')
