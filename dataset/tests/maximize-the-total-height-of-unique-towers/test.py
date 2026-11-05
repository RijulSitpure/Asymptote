from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumTotalSum([2, 3, 4, 3]) == 10, "Example 1 failed"
    assert s.maximumTotalSum([15, 10]) == 25, "Example 2 failed"
    assert s.maximumTotalSum([2, 2, 1]) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
