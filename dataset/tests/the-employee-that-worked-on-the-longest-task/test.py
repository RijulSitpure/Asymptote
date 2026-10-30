from solution import Solution
s = Solution()
assert s.hardestWorker(10, [[0,3],[2,5],[0,9],[1,15]]) == 1
assert s.hardestWorker(26, [[1,1],[3,7],[2,12],[7,17]]) == 3
assert s.hardestWorker(2, [[0,10],[1,20]]) == 0
print("All tests passed for the-employee-that-worked-on-the-longest-task!")
