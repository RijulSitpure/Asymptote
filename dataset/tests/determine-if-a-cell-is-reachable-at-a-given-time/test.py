from solution import Solution
s = Solution()
assert s.isReachableAtTime(2, 4, 7, 7, 6) == True
assert s.isReachableAtTime(3, 1, 7, 3, 3) == False
assert s.isReachableAtTime(1, 1, 1, 1, 1) == False
assert s.isReachableAtTime(1, 1, 1, 1, 2) == True
print("determine-if-a-cell-is-reachable-at-a-given-time passed")
