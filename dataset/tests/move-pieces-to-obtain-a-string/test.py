from solution import Solution
s = Solution()
assert s.canChange('_L__R__R_', 'L______RR') == True
assert s.canChange('R_L_', '__LR') == False
assert s.canChange('_R', 'R_') == False
print("All tests passed for move-pieces-to-obtain-a-string!")
