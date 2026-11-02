from solution import Solution
s = Solution()
assert s.splitWordsBySeparator(["one.two.three", "four.five", "six"], ".") == ["one", "two", "three", "four", "five", "six"]
assert s.splitWordsBySeparator(["$easy$", "$problem$"], "$") == ["easy", "problem"]
assert s.splitWordsBySeparator(["|||"], "|") == []
print("All tests passed for split-strings-by-separator")