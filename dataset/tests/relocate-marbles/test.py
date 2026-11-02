from solution import Solution
s = Solution()
assert s.relocateMarbles([1,4,5,9,1,2], [1,5,8,9], [2,7,8,8]) == [2, 4, 7, 8]
assert s.relocateMarbles([1, 1, 3, 3], [1, 3], [2, 2]) == [2]
print("All tests passed for relocate-marbles")
