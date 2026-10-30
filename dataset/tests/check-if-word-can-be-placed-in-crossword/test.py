from solution import Solution

s = Solution()
assert s.placeWordInCrossword([["#", " ", "#"], [" ", " ", "#"], ["#", "c", " "]], 'abc') == True
assert s.placeWordInCrossword([[" ", "#", "a"], [" ", "#", "c"], [" ", "#", "a"]], 'ac') == False
assert s.placeWordInCrossword([["#", " ", "#"], [" ", " ", "#"], ["#", " ", " "]], 'abc') == True
print('OK')