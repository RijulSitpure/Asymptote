from solution import Solution
s = Solution()
assert s.haveConflict(["01:15","02:00"], ["02:00","03:00"]) == True
assert s.haveConflict(["01:00","02:00"], ["01:20","03:00"]) == True
assert s.haveConflict(["10:00","11:00"], ["14:00","15:00"]) == False
print("All tests passed for determine-if-two-events-have-conflict!")
