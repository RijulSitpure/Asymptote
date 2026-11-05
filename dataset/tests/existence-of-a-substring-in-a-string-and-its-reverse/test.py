from solution import Solution

s = Solution()
assert s.isSubstringPresent("leetcode") == True
assert s.isSubstringPresent("abcba") == True
assert s.isSubstringPresent("abcd") == False
print("existence-of-a-substring-in-a-string-and-its-reverse tests passed!")
