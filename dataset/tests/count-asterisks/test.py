from solution import Solution
s = Solution()
assert s.countAsterisks("l|*e*et|c**o|*de|") == 2
assert s.countAsterisks("iamprogrammer") == 0
assert s.countAsterisks("yo|uar|e**|b|e***au|tifu|l") == 5
print("All tests passed for count-asterisks!")
