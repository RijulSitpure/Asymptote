from solution import Solution
s = Solution()
assert s.sumPrefixScores(["abc","ab","bc","b"]) == [5,4,3,2]
assert s.sumPrefixScores(["abcd"]) == [4]
print("All tests passed for sum-of-prefix-scores-of-strings!")
