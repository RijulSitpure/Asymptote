from solution import Solution

s = Solution()
assert s.numberOfSpecialChars("aaAbcBC") == 3
assert s.numberOfSpecialChars("abc") == 0
assert s.numberOfSpecialChars("abBCab") == 1
print("All tests passed successfully.")
