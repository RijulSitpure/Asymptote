from solution import Solution

def run_tests():
    s = Solution()
    assert s.countSubmatrices([[4, 3, 2, 1], [8, 7, 6, 1]], 3) == 8, "Example 1 failed"
    assert s.countSubmatrices([[1, 1, 1], [1, 1, 1], [1, 1, 1]], 1) == 36, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
