from solution import Solution
s = Solution()
assert s.closetTarget(['hello','i','am','leetcode','hello'], 'hello', 1) == 1
assert s.closetTarget(['a','b','leetcode'], 'leetcode', 0) == 1
assert s.closetTarget(['i','eat','apples'], 'banana', 0) == -1
print('All tests passed for shortest-distance-to-target-string-in-a-circular-array!')
