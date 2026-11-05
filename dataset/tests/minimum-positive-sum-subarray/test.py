from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumSumSubarray([3, -2, 1, 4], 2, 3) == 1, "Example 1 failed"
    assert s.minimumSumSubarray([-2, 2, -3, 1], 2, 3) == -1, "Example 2 failed"
    assert s.minimumSumSubarray([1, 2, 3, 4], 2, 4) == 3, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

