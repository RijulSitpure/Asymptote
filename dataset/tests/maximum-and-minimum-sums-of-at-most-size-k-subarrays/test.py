from solution import Solution

def run_tests():
    s = Solution()
    assert s.minMaxSubarraySum([1, 2, 3], 2) == 20, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
