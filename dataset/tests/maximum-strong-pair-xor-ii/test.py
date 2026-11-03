from solution import Solution
s = Solution()
assert s.maximumStrongPairXor([1, 2, 3, 4, 5]) == 7
assert s.maximumStrongPairXor([10, 100]) == 0
assert s.maximumStrongPairXor([500, 520, 2500, 3000]) == 1020
print('maximum-strong-pair-xor-ii passed')
