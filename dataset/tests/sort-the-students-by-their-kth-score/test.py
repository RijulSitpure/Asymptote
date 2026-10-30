from solution import Solution
s = Solution()
assert s.sortTheStudents([[10,6,9,1],[7,5,11,2],[4,8,3,15]], 2) == [[7,5,11,2],[10,6,9,1],[4,8,3,15]]
assert s.sortTheStudents([[3,4],[5,6]], 0) == [[5,6],[3,4]]
print('All tests passed for sort-the-students-by-their-kth-score!')
