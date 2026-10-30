from solution import Solution

s = Solution()
assert s.minSwaps([0,1,0,1,1,0,0]) == 1
assert s.minSwaps([0,1,1,1,0,0,1,1,0]) == 2
assert s.minSwaps([1,1,0,0,1]) == 0
print("All tests passed for minimum-swaps-to-group-all-1s-together-ii!")
