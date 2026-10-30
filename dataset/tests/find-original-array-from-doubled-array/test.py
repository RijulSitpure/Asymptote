from solution import Solution

s = Solution()
assert s.findOriginalArray([1,3,4,2,6,8]) == [1,3,4]
assert s.findOriginalArray([6,3,0,1]) == []
assert s.findOriginalArray([1]) == []
print('OK')