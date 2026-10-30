from solution import Solution
s = Solution()
assert s.similarPairs(['aba','aabb','abcd','bac','aabc']) == 2
assert s.similarPairs(['aabb','ab','ba']) == 3
assert s.similarPairs(['nba','cba','dba']) == 0
print('All tests passed for count-pairs-of-similar-strings!')
