from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxValue([2, 6, 7], 1) == 5, "Example 1 failed"
    assert s.maxValue([4, 2, 5, 6, 7], 2) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
