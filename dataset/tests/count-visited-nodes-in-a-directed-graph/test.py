from solution import Solution
s = Solution()
assert s.countVisitedNodes([1, 2, 0, 0]) == [3, 3, 3, 4]
assert s.countVisitedNodes([1, 2, 3, 4, 0]) == [5, 5, 5, 5, 5]
print("count-visited-nodes-in-a-directed-graph passed")
