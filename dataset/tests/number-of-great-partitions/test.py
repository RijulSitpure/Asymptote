from solution import Solution
s = Solution()
assert s.countPartitions([1,2,3,4], 4) == 6
assert s.countPartitions([3,3,3], 4) == 0
assert s.countPartitions([6,6], 2) == 2
print('All tests passed for number-of-great-partitions!')
