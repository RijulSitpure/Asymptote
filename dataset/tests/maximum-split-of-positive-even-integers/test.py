from solution import Solution

s = Solution()
assert s.maximumEvenSplit(12) == [2, 4, 6]
assert s.maximumEvenSplit(7) == []
assert s.maximumEvenSplit(28) == [2, 4, 6, 16]
print("All tests passed for maximum-split-of-positive-even-integers!")
