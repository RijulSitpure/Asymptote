from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations([1, 4, 2]) == 2, "Example 1 failed"
    assert s.minOperations([3, 3, 3]) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

