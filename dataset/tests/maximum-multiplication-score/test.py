from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxScore([3, 2, 5, 6], [2, -6, 4, -5, -3, 2, -7]) == 26, "Example 1 failed"
    assert s.maxScore([-1, 4, 5, -2], [-5, -1, -3, -2, -4]) == -1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
