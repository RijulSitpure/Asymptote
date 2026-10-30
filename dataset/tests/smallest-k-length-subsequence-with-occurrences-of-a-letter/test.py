from solution import Solution

s = Solution()
assert s.smallestSubsequence('leet', 3, 'e', 1) == 'eet'
assert s.smallestSubsequence('leetcode', 4, 'e', 2) == 'ecde'
assert s.smallestSubsequence('bb', 2, 'b', 2) == 'bb'
print('OK')