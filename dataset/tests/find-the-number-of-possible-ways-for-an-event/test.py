from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfWays(1, 2, 3) == 6, "Example 1 failed"
    assert s.numberOfWays(5, 2, 1) == 32, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
