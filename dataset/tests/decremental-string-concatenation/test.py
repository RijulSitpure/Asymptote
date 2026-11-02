from solution import Solution
s = Solution()
assert s.minimizeConcatenatedLength(["aa","ab","bc"]) == 4
assert s.minimizeConcatenatedLength(["ab","b"]) == 2
assert s.minimizeConcatenatedLength(["aaa","c","aba"]) == 6
print("All tests passed for decremental-string-concatenation")
