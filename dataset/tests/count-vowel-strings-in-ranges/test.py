from solution import Solution
s = Solution()
assert s.vowelStrings(['aba','bcb','ece','aa','e'], [[0,2],[1,4],[1,1]]) == [2,3,0]
assert s.vowelStrings(['a','e','i'], [[0,2],[0,1],[2,2]]) == [3,2,1]
print('All tests passed for count-vowel-strings-in-ranges!')
