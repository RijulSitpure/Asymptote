from solution import Solution

def run_tests():
    s = Solution()
    assert s.countOfArrays(3, 4, 2) == 8, "Example 1 failed"
    assert s.countOfArrays(5, 1, 0) == 1, "Example 2 failed"
    assert s.countOfArrays(7, 7, 5) == 5832, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
