from solution import Solution

def run_tests():
    s = Solution()
    assert s.minDifference([1, 2, -1, 10, 8]) == 4, "Example 1 failed"
    assert s.minDifference([-1, -1, -1]) == 0, "Example 2 failed"
    assert s.minDifference([-1, 10, -1, 8]) == 1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

