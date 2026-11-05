from solution import Solution

s = Solution()
assert s.maxUpgradableServers([4, 3], [3, 5], [4, 2], [8, 9]) == [3, 2]
assert s.maxUpgradableServers([1], [2], [1], [1]) == [0]
print('All tests passed successfully.')
