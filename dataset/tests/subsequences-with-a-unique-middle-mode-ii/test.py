from solution import Solution

def run_tests():
    s = Solution()
    assert s.subsequencesWithMiddleMode([1, 1, 1, 1, 1, 1]) == 6, "Example 1 failed"
    assert s.subsequencesWithMiddleMode([1, 2, 2, 3, 3, 4]) == 4, "Example 2 failed"
    assert s.subsequencesWithMiddleMode([0, 1, 2, 3, 4, 5, 6, 7, 8]) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

