from solution import Solution
s = Solution()
assert s.countTime("?5:00") == 2
assert s.countTime("0?:0?") == 100
assert s.countTime("??:??") == 1440
print("All tests passed for number-of-valid-clock-times!")
