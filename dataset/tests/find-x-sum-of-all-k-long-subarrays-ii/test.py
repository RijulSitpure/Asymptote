from solution import Solution

def run_tests():
    s = Solution()
    assert s.findXSum([1, 1, 2, 2, 3, 4, 2, 3], 6, 2) == [6, 10, 12], "Example 1 failed"
    assert s.findXSum([3, 8, 7, 8, 7, 5], 2, 2) == [11, 15, 15, 15, 12], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
