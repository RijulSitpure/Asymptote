from solution import Solution

def run_tests():
    s = Solution()
    assert s.findMinimumTime([3, 4, 1]) == 4, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

