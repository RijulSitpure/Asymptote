from solution import Solution
s = Solution()
assert s.matchReplacement("fool3e7bar", "leet", [["e","3"],["t","7"],["t","8"]]) == True
assert s.matchReplacement("fooleetbar", "f00l", [["o","0"]]) == False
print("All tests passed for match-substring-after-replacement!")
