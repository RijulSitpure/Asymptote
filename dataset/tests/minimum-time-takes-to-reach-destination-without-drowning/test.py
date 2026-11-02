from solution import Solution
s = Solution()
assert s.minimumSeconds([["D",".","*"],[".",".","."],[".","S","."]]) == 3
assert s.minimumSeconds([["D","X","*"],["X","X","."],[".","S","."]]) == -1
print("minimum-time-takes-to-reach-destination-without-drowning passed")
