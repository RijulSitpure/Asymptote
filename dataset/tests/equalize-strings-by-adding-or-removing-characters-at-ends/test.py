from solution import Solution

s = Solution()
assert s.minOperations("uncompress", "compress") == 2
assert s.minOperations("leetcode", "code") == 4
assert s.minOperations("a", "b") == 2
print("All tests passed successfully.")
