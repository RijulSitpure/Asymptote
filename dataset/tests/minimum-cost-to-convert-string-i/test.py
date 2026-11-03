import sys
from solution import Solution
sol = Solution()

res = sol.minimumCost(source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20])
assert res == 28, f'Expected 28, got {res}'
res = sol.minimumCost(source = "aaaa", target = "bbbb", original = ["a","c"], changed = ["c","b"], cost = [1,2])
assert res == 12, f'Expected 12, got {res}'
res = sol.minimumCost(source = "abcd", target = "abce", original = ["a"], changed = ["e"], cost = [10000])
assert res == -1, f'Expected -1, got {res}'
print('All tests passed!')
