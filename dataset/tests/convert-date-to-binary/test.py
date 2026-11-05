from solution import Solution
sol = Solution()
assert sol.convertDateToBinary("2080-02-29") == "100000100000-10-11101"
assert sol.convertDateToBinary("1900-01-01") == "11101101100-1-1"
print("All tests passed successfully.")
