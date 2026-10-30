from solution import Solution
s = Solution()
assert s.minimizeResult("247+38") == "2(47+38)"
assert s.minimizeResult("12+34") == "1(2+3)4"
print("All tests passed for minimize-result-by-adding-parentheses-to-expression!")
