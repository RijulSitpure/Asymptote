from solution import Solution

s = Solution()
assert s.subStrHash("leetcode", 7, 20, 2, 0) == "ee"
assert s.subStrHash("fbxzaad", 31, 100, 3, 32) == "fbx"
print("All tests passed for find-substring-with-given-hash-value!")
