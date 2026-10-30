from solution import Solution

s = Solution()
assert s.repeatLimitedString("cczazcc", 3) == "zzcccac"
assert s.repeatLimitedString("aababab", 2) == "bbabaa"
print("All tests passed for construct-string-with-repeat-limit!")
