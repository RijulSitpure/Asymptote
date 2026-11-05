from solution import Solution

s = Solution()
assert s.findPermutationDifference("abc", "bac") == 2
assert s.findPermutationDifference("abcde", "edbac") == 12
print("All tests passed successfully.")
