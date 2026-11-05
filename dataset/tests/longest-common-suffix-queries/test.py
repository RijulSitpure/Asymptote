from solution import Solution

s = Solution()
assert s.stringIndices(["abcd", "bcd", "xbcd"], ["cd", "bcd", "xyz"]) == [1, 1, 1]
assert s.stringIndices(["abcdefgh", "poiuygh", "ghghgh"], ["gh", "acbfgh", "acbfegh"]) == [2, 0, 2]
print("All tests passed successfully.")
