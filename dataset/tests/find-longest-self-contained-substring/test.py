from solution import Solution

s = Solution()
assert s.maxSubstringLength("abba") == 2
assert s.maxSubstringLength("abab") == -1
assert s.maxSubstringLength("abacaba") == 1
print("All tests passed successfully.")
