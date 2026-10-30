from solution import Solution
s = Solution()
assert s.twoEditWords(['word','note','ants','wood'], ['wood','joke','moat']) == ['word','note','wood']
assert s.twoEditWords(['yes'], ['not']) == []
print('All tests passed for words-within-two-edits-of-dictionary!')
