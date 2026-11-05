from solution import Solution

s = Solution()
assert s.numberOfSubarrays([1, 4, 3, 3, 2]) == 6
assert s.numberOfSubarrays([3, 3, 3]) == 6
assert s.numberOfSubarrays([1]) == 1
print("All tests passed successfully.")
