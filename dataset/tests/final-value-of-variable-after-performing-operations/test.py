from solution import Solution

s = Solution()
assert s.finalValueAfterOperations(['--X','X++','X++']) == 1
assert s.finalValueAfterOperations(['++X','++X','X++']) == 3
assert s.finalValueAfterOperations(['X++','++X','--X','X--']) == 0
print('OK')