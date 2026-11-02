from solution import Solution
s = Solution()
assert s.maximizeTheProfit(5, [[0, 0, 1], [0, 2, 2], [1, 3, 2]]) == 3
assert s.maximizeTheProfit(5, [[0, 0, 1], [0, 2, 10], [1, 3, 2]]) == 10
print("maximize-the-profit-as-the-salesman passed")
