from solution import Solution

s = Solution()
assert s.getSmallestString("zxyzxyzx", 10) == "aaaaayzx"
assert s.getSmallestString("xaxcd", 4) == "aawcd"
assert s.getSmallestString("lol", 0) == "lol"
print("All tests passed successfully.")
