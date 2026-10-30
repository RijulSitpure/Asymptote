from solution import Solution
s = Solution()
assert s.getShortestSequence([4,2,1,2,3,3,2,4,1], 4) == 3
assert s.getShortestSequence([1,1,2,2], 2) == 2
assert s.getShortestSequence([1,1,1,1], 2) == 1
print("All tests passed for shortest-impossible-sequence-of-rolls!")
