from solution import Solution

def run_tests():
    s = Solution()
    assert s.getSum([1, 2]) == 6, "Example 1 failed"
    assert s.getSum([1, 4, 2, 3]) == 31, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
