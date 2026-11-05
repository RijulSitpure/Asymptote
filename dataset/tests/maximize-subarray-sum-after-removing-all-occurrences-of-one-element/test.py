from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxSubarraySum([-3, 2, -2, -1, 3, -2, 3]) == 7, "Example 1 failed"
    assert s.maxSubarraySum([1, 2, 3, 4]) == 10, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

