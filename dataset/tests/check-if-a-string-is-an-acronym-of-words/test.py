from solution import Solution
s = Solution()
assert s.isAcronym(["alice", "bob", "charlie"], "abc") == True
assert s.isAcronym(["an", "apple"], "a") == False
assert s.isAcronym(["never", "gonna", "give", "up", "on", "you"], "ngguoy") == True
print("check-if-a-string-is-an-acronym-of-words passed")
