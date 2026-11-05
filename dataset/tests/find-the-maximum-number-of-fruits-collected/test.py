from solution import Solution

def run_tests():
    s = Solution()
    grid1 = [[1,2,3,4],[5,6,8,7],[9,10,11,12],[13,14,15,16]]
    assert s.maxCollectedFruits(grid1) == 100, "Example 1 failed"
    grid2 = [[1,1],[1,1]]
    assert s.maxCollectedFruits(grid2) == 4, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

