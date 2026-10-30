from solution import Solution

s = Solution()
res = s.twoOutOfThree([1,1,3,2], [2,3], [3])
assert set(res) == {2, 3}
res2 = s.twoOutOfThree([3,1], [2,3], [1,2])
assert set(res2) == {1, 2, 3}
res3 = s.twoOutOfThree([1,2,2], [4,3,3], [5])
assert res3 == []
print('OK')