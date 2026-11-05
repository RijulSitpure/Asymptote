from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumOperations([1, 2, 3, 4, 2, 3, 3, 5, 7]) == 2, "Example 1 failed"
    assert s.minimumOperations([4, 5, 6, 4, 4]) == 2, "Example 2 failed"
    assert s.minimumOperations([6, 7, 8, 9]) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

