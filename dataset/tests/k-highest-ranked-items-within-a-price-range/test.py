from solution import Solution

s = Solution()
assert s.highestRankedKItems([[1,2,0,1],[4,1,0,1],[0,1,0,2],[1,3,1,1]], [2,5], [0,0], 3) == [[0,1],[1,0],[3,1]]
assert s.highestRankedKItems([[1,1,1],[0,0,1],[2,3,4]], [2,3], [0,0], 3) == [[2,1],[2,0]]
print("All tests passed for k-highest-ranked-items-within-a-price-range!")
