from solution import Solution

s = Solution()
assert s.findGameWinner(3) == True
assert s.findGameWinner(1) == False
assert s.findGameWinner(2) == True
print('OK')