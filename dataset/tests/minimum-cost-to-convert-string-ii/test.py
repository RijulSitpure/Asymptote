import sys
from solution import Solution
sol = Solution()

res = sol.minimumCost(source = "abcd", target = "acbe", original = ["a","b","c","c","e","d"], changed = ["b","c","b","e","b","e"], cost = [2,5,5,1,2,20])
assert res == 28, f'Expected 28, got {res}'
res = sol.minimumCost(source = "abcdefgh", target = "acdeeghh", original = ["bcd","fgh","thh"], changed = ["cde","thh","ghh"], cost = [1,3,5])
assert res == 9, f'Expected 9, got {res}'
res = sol.minimumCost(source = "abcdefgh", target = "addddddd", original = ["bcd","defgh"], changed = ["ddd","ddddd"], cost = [100,1578])
assert res == -1, f'Expected -1, got {res}'
print('All tests passed!')
