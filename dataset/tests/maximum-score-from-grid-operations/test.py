from solution import Solution
sol = Solution()
assert sol.maximumScore([[0,0,0,0,0],[0,0,3,0,0],[0,1,0,0,0],[5,0,0,3,0],[0,0,0,0,2]]) == 11
assert sol.maximumScore([[10,9,0,0,15],[7,1,0,8,0],[5,20,0,11,0],[0,0,0,1,2],[8,12,1,10,6]]) == 94
print("All tests passed successfully.")