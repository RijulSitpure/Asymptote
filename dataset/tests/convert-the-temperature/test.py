from solution import Solution
s = Solution()
res = s.convertTemperature(36.50)
assert abs(res[0] - 309.65) < 1e-4
assert abs(res[1] - 97.7) < 1e-4
print('All tests passed for convert-the-temperature!')
