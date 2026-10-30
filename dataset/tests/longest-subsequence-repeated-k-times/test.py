from solution import Solution

s = Solution()
assert s.longestSubsequenceRepeatedK('letsleetcode', 2) == 'let'
assert s.longestSubsequenceRepeatedK('bb', 2) == 'b'
assert s.longestSubsequenceRepeatedK('ab', 2) == ''
print('OK')