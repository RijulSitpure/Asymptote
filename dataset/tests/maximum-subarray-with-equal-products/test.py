from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxLength([1, 2, 1, 2, 1, 1, 1]) == 5, "Example 1 failed"
    assert s.maxLength([2, 3, 4, 5, 6]) == 3, "Example 2 failed"
    assert s.maxLength([1, 2, 3, 1, 4, 5, 1]) == 5, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

