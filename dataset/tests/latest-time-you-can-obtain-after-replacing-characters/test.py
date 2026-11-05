from solution import Solution

s = Solution()
assert s.findLatestTime("1?:?4") == "11:54"
assert s.findLatestTime("0?:5?") == "09:59"
assert s.findLatestTime("??:??") == "11:59"
print("All tests passed successfully.")
