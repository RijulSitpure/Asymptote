from solution import Solution
s = Solution()
assert s.countSubMultisets([1, 2, 2, 3], 6, 6) == 1
assert s.countSubMultisets([2, 1, 4, 2, 7], 1, 5) == 7
assert s.countSubMultisets([1, 2, 1, 3, 5, 2], 3, 5) == 9
print("count-of-sub-multisets-with-bounded-sum passed")
