from solution import Solution
s = Solution()
assert s.survivedRobotsHealths([5,4,3,2,1], [2,17,9,15,10], "RRRRR") == [2, 17, 9, 15, 10]
assert s.survivedRobotsHealths([3,5,2,6], [10,10,15,12], "RLRL") == [14]
assert s.survivedRobotsHealths([1,2,5,6], [10,10,11,11], "RLRL") == []
print("All tests passed for robot-collisions")
