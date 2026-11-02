from solution import Solution
s = Solution()
assert s.minExtraChar("leetscode", ["leet", "code", "leetcode"]) == 1
assert s.minExtraChar("sayhelloworld", ["hello", "world"]) == 3
print("All tests passed for extra-characters-in-a-string")
