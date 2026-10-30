from solution import Solution
s = Solution()
assert s.minimumTotalPrice(4, [[0,1],[1,2],[1,3]], [2,2,10,6], [[0,3],[2,1],[2,3]]) == 23
assert s.minimumTotalPrice(2, [[0,1]], [2,2], [[0,0]]) == 1
print('All tests passed for minimize-the-total-price-of-the-trips!')
