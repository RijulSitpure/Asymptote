from solution import Solution
s = Solution()
assert s.convertTime("02:30", "04:35") == 3
assert s.convertTime("11:00", "11:01") == 1
print("All tests passed for minimum-number-of-operations-to-convert-time!")
