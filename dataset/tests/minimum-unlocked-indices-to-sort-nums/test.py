from solution import Solution

def run_tests():
    s = Solution()
    assert s.minUnlockedIndices([1, 2, 1, 2, 3, 2], [1, 0, 1, 1, 0, 1]) == 0, "Example 1 failed"
    assert s.minUnlockedIndices([1, 2, 1, 1, 3, 2, 2], [1, 0, 1, 1, 0, 1, 0]) == 2, "Example 2 failed"
    assert s.minUnlockedIndices([1, 2, 1, 2, 3, 2, 1], [0, 0, 0, 0, 0, 0, 0]) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
