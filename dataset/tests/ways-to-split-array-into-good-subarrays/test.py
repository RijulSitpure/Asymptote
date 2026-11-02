from solution import Solution
s = Solution()
assert s.numberOfGoodSubarraySplits([0, 1, 0, 0, 1]) == 3
assert s.numberOfGoodSubarraySplits([0, 1, 0]) == 1
assert s.numberOfGoodSubarraySplits([0, 0, 0]) == 0
print("All tests passed for ways-to-split-array-into-good-subarrays")
