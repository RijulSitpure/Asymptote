from solution import Solution
s = Solution()
assert s.areSimilar([[1, 2, 1, 2], [5, 5, 5, 5], [6, 3, 6, 3]], 2) == True
assert s.areSimilar([[2, 2], [2, 2]], 3) == True
assert s.areSimilar([[1, 2]], 1) == False
print('matrix-similarity-after-cyclic-shifts passed')
