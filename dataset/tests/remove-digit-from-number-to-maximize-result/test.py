from solution import Solution
s = Solution()
assert s.removeDigit("123", "3") == "12"
assert s.removeDigit("1231", "1") == "231"
assert s.removeDigit("551", "5") == "51"
print("All tests passed for remove-digit-from-number-to-maximize-result!")
