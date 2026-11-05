from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumMatchingIndices([3, 1, 2, 3, 1, 2], [1, 2, 3, 1, 2, 3]) == 6, "Example 1 failed"
    assert s.maximumMatchingIndices([1, 2, 3, 4], [2, 1, 4, 3]) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

