from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumOperations([[3, 2], [1, 3], [3, 4], [0, 1]]) == 15, "Example 1 failed"
    assert s.minimumOperations([[3, 2, 1], [2, 1, 0], [1, 2, 3]]) == 12, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

