from solution import Solution

s = Solution()
assert s.countAlternatingSubarrays([0, 1, 0, 1]) == 10
assert s.countAlternatingSubarrays([1, 0, 1, 0]) == 10
assert s.countAlternatingSubarrays([0, 1, 1, 0, 1]) == 9
print("All tests passed successfully.")
