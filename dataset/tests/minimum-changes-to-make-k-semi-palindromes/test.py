from solution import Solution
s = Solution()
assert s.minimumChanges('abcac', 2) == 1
assert s.minimumChanges('abcdef', 2) == 2
assert s.minimumChanges('aabbaa', 3) == 0
print("minimum-changes-to-make-k-semi-palindromes passed")
