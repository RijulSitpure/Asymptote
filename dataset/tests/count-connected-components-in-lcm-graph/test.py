from solution import Solution

def run_tests():
    s = Solution()
    assert s.countComponents([2, 4, 8, 3, 9], 5) == 4, "Example 1 failed"
    assert s.countComponents([2, 4, 8, 3, 9, 12], 10) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

