from solution import Solution

def run_tests():
    s = Solution()
    assert s.distanceSum(2, 2, 2) == 8, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
