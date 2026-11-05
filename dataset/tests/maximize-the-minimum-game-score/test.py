from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxScore([2, 4], 3) == 4, "Example 1 failed"
    assert s.maxScore([1, 2, 3], 5) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
