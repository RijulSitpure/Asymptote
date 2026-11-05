from solution import Solution

s = Solution()
assert s.minimumDeletions("aabcaba", 0) == 3
assert s.minimumDeletions("dabdcbdcdcd", 2) == 2
assert s.minimumDeletions("aaabaaa", 2) == 1
print("minimum-deletions-to-make-string-k-special tests passed!")
