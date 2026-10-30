from solution import Solution
s = Solution()
assert s.colorTheArray(4, [[0,2],[1,2],[3,1],[1,1],[2,1]]) == [0,1,1,0,2]
assert s.colorTheArray(1, [[0,1000]]) == [0]
print('All tests passed for number-of-adjacent-elements-with-the-same-color!')
