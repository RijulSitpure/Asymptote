from solution import Solution

def run_tests():
    s = Solution()
    assert s.findMaximumScore([1, 3, 1, 5]) == 7, "Example 1 failed"
    assert s.findMaximumScore([4, 3, 1, 3, 2]) == 16, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
