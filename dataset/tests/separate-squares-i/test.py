from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.separateSquares([[0, 0, 1], [2, 2, 1]])
    assert abs(res1 - 1.0) < 1e-4, "Example 1 failed"
    res2 = s.separateSquares([[0, 0, 2], [1, 1, 1]])
    assert abs(res2 - 1.16667) < 1e-4, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
