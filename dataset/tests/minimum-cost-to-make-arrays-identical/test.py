from solution import Solution

def run_tests():
    s = Solution()
    assert s.minCost([-7, 9, 5], [7, -2, -5], 2) == 13, "Example 1 failed"
    assert s.minCost([2, 1], [2, 1], 0) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

