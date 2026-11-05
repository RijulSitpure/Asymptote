from solution import Solution

def run_tests():
    s = Solution()
    grid1 = [[1, 7, 3], [9, 8, 2], [4, 5, 6]]
    expected1 = [[8, 2, 3], [9, 6, 7], [4, 5, 1]]
    assert s.sortMatrix(grid1) == expected1, "Example 1 failed"
    grid2 = [[0, 1], [1, 2]]
    expected2 = [[2, 1], [1, 0]]
    assert s.sortMatrix(grid2) == expected2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
