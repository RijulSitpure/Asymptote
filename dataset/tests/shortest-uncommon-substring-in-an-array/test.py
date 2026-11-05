from solution import Solution

s = Solution()
assert s.shortestSubstrings(["cab","ad","bad","c"]) == ["ab","","ba",""]
assert s.shortestSubstrings(["abc","bcd","abcd"]) == ["","","abcd"]
print("shortest-uncommon-substring-in-an-array tests passed!")
