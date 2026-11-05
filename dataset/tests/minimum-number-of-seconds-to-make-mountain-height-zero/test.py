from solution import Solution

def run_tests():
    s = Solution()
    assert s.minNumberOfSeconds(4, [2, 1, 1]) == 3, "Example 1 failed"
    assert s.minNumberOfSeconds(10, [3, 2, 2, 4]) == 12, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
