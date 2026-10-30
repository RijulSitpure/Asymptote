from solution import Solution
s = Solution()
assert s.onesMinusZeros([[0,1,1],[1,0,1],[0,0,1]]) == [[0,0,4],[0,0,4],[-2,-2,2]]
assert s.onesMinusZeros([[1,1,1],[1,1,1]]) == [[5,5,5],[5,5,5]]
print('All tests passed for difference-between-ones-and-zeros-in-row-and-column!')
