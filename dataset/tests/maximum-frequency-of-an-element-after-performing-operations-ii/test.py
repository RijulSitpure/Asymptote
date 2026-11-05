from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxFrequency([1, 4, 5], 1, 2) == 2, "Example 1 failed"
    assert s.maxFrequency([5, 11, 20, 20], 5, 1) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

