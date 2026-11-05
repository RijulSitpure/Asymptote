from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations([1, 2, 3, 4, 5], 3) == 2, "Example 1 failed"
    assert s.minOperations([10, 10, 10], 2) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

