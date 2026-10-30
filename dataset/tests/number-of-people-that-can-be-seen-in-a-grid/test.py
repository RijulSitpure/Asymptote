from solution import Solution
s = Solution()
assert s.seePeople([[3,1,4,2,5]]) == [[2,1,2,1,0]]
assert s.seePeople([[5,1],[3,1],[4,1]]) == [[3,1],[2,1],[1,0]]
print("All tests passed for number-of-people-that-can-be-seen-in-a-grid!")
