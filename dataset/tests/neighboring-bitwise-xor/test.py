from solution import Solution
s = Solution()
assert s.doesValidArrayExist([1, 1, 0]) is True
assert s.doesValidArrayExist([1, 1]) is True
assert s.doesValidArrayExist([1, 0]) is False
print('All tests passed for neighboring-bitwise-xor!')
