from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations(10, 12) == 85, "Example 1 failed"
    assert s.minOperations(4, 8) == -1, "Example 2 failed"
    assert s.minOperations(6, 2) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

