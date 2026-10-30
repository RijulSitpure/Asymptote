from solution import Solution
s = Solution()
assert s.dividePlayers([3,2,5,1,3,4]) == 22
assert s.dividePlayers([3,4]) == 12
assert s.dividePlayers([1,1,2,3]) == -1
print('All tests passed for divide-players-into-teams-of-equal-skill!')
