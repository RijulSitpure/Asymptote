from solution import Solution
s = Solution()
assert s.mostFrequentEven([0,1,2,2,4,4,1]) == 2
assert s.mostFrequentEven([4,4,4,9,2,4]) == 4
assert s.mostFrequentEven([29,47,21,41,13,37,25,7]) == -1
print("All tests passed for most-frequent-even-element!")
