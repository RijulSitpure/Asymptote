from solution import Solution

def run_tests():
    s = Solution()
    assert s.countValidSelections([1, 0, 2, 0, 3]) == 2, "Example 1 failed"
    assert s.countValidSelections([2, 3, 4, 0, 4, 1, 0]) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

