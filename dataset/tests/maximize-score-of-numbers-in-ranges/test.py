from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxPossibleScore([6, 0, 3], 2) == 4, "Example 1 failed"
    assert s.maxPossibleScore([2, 6, 8], 5) == 5, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
