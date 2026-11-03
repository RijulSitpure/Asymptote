from solution import Solution
s = Solution()
assert s.maxSubarrayLength([1, 2, 3, 1, 2, 3, 1, 2], 2) == 6
assert s.maxSubarrayLength([1, 2, 1, 2, 1, 2, 1, 2], 1) == 2
assert s.maxSubarrayLength([5, 5, 5, 5, 5, 5, 5], 4) == 4
print('length-of-longest-subarray-with-at-most-k-frequency passed')
