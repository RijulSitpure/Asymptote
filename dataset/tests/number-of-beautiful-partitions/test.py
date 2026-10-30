from solution import Solution
s = Solution()
assert s.beautifulPartitions('23542185131', 3, 2) == 3
assert s.beautifulPartitions('23542185131', 3, 3) == 1
assert s.beautifulPartitions('3312958', 1, 1) == 1
print('All tests passed for number-of-beautiful-partitions!')
