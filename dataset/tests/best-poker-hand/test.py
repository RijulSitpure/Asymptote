from solution import Solution
s = Solution()
assert s.bestHand([13,2,3,1,9], ['a','a','a','a','a']) == 'Flush'
assert s.bestHand([4,4,2,4,4], ['d','a','a','b','c']) == 'Three of a Kind'
assert s.bestHand([10,10,2,12,9], ['a','b','c','a','d']) == 'Pair'
print("All tests passed for best-poker-hand!")
