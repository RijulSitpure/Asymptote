from solution import Solution
s = Solution()
assert s.maximumNumberOfStringPairs(["cd","ac","dc","ca","zz"]) == 2
assert s.maximumNumberOfStringPairs(["ab","ba","cc"]) == 1
assert s.maximumNumberOfStringPairs(["aa","ab"]) == 0
print("All tests passed for find-maximum-number-of-string-pairs")
