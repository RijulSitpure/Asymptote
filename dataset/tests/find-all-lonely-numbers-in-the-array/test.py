from solution import Solution

s = Solution()
assert sorted(s.findLonely([10,6,5,8])) == [8, 10]
assert sorted(s.findLonely([1,3,5,3])) == [1, 5]
print("All tests passed for find-all-lonely-numbers-in-the-array!")
