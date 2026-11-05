from solution import Solution

s = Solution()
assert s.minimizeStringValue("???") == "abc"
assert s.minimizeStringValue("a?a?") == "abac"
print("replace-question-marks-in-string-to-minimize-its-value tests passed!")
