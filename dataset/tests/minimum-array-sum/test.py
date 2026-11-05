from solution import Solution

def run_tests():
    s = Solution()
    assert s.minArraySum([2, 8, 3, 19, 3], 3, 1, 1) == 23, "Example 1 failed"
    assert s.minArraySum([2, 4, 3], 3, 2, 1) == 3, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

