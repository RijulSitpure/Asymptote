from solution import Solution

def run_tests():
    s = Solution()
    assert s.minMaxSums([1, 2, 3], 2) == 24, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
