from solution import Solution

def run_tests():
    s = Solution()
    assert s.getLargestOutlier([2, 3, 5, 10]) == 10, "Example 1 failed"
    assert s.getLargestOutlier([-2, -1, -3, -6, 4]) == 4, "Example 2 failed"
    assert s.getLargestOutlier([1, 1, 1, 1, 1, 5, 5]) == 5, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
