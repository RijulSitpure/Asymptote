from solution import Solution

def run_tests():
    s = Solution()
    assert s.minElement([10, 12, 13, 14]) == 1, "Example 1 failed"
    assert s.minElement([1, 2, 3, 4]) == 1, "Example 2 failed"
    assert s.minElement([99, 77, 33]) == 6, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
