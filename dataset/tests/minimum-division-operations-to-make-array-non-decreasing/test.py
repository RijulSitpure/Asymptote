from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations([25, 7]) == 1, "Example 1 failed"
    assert s.minOperations([7, 7, 6]) == -1, "Example 2 failed"
    assert s.minOperations([1, 1, 1, 1]) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
