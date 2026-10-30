from solution import Solution
s = Solution()
assert s.maximumWhiteTiles([[1,5],[10,11],[12,18],[20,25],[30,32]], 10) == 9
assert s.maximumWhiteTiles([[10,11],[1,1]], 2) == 2
print("All tests passed for maximum-white-tiles-covered-by-a-carpet!")
