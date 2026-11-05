from solution import Solution

def run_tests():
    s = Solution()
    assert s.countPathsWithXorValue([[2, 1, 5], [7, 10, 0], [12, 6, 4]], 11) == 3, "Example 1 failed"
    assert s.countPathsWithXorValue([[1, 3, 3, 3], [0, 3, 3, 2], [3, 0, 1, 1]], 2) == 5, "Example 2 failed"
    assert s.countPathsWithXorValue([[1, 1, 1, 2], [2, 0, 3, 2], [3, 3, 2, 2]], 1) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

