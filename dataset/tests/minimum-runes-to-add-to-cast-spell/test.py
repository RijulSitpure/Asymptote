from solution import Solution

def run_tests():
    s = Solution()
    assert s.minRunesToAdd(6, [0], [0, 1, 2, 3], [1, 2, 3, 0]) == 2, "Example 1 failed"
    assert s.minRunesToAdd(7, [3, 5], [0, 1, 2, 3, 5], [1, 2, 0, 4, 6]) == 1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

