from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxFrequency([1, 2, 3, 4, 5, 6], 1) == 2, "Example 1 failed"
    assert s.maxFrequency([10, 2, 3, 4, 5, 5, 4, 3, 2, 2], 10) == 4, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
