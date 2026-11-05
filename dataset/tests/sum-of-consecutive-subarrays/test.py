from solution import Solution

def run_tests():
    s = Solution()
    assert s.getSum([1, 2, 3]) == 20, "Example 1 failed"
    assert s.getSum([3, 2, 1]) == 20, "Example 2 failed"
    assert s.getSum([100, 3, 5]) == 108, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
