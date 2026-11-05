from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxStudentsOnBench([[1, 2], [2, 2], [3, 3], [1, 2], [3, 4]]) == 2, "Example 1 failed"
    assert s.maxStudentsOnBench([[1, 1], [2, 1], [3, 1], [4, 1]]) == 4, "Example 2 failed"
    assert s.maxStudentsOnBench([[1, 2], [1, 3], [1, 4]]) == 1, "Example 3 failed"
    assert s.maxStudentsOnBench([]) == 0, "Example 4 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
