from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations([5, 2, 5, 4, 5], 2) == 2, "Example 1 failed"
    assert s.minOperations([2, 1, 2], 2) == -1, "Example 2 failed"
    assert s.minOperations([9, 7, 5, 3], 1) == 4, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

