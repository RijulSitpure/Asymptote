from solution import Solution
s = Solution()
assert s.goodSubsetofBinaryMatrix([[0,1,1,0],[0,0,0,1],[1,1,1,1]]) == [0, 1]
assert s.goodSubsetofBinaryMatrix([[0]]) == [0]
assert s.goodSubsetofBinaryMatrix([[1,1,1],[1,1,1]]) == []
print("All tests passed for find-a-good-subset-of-the-matrix")
