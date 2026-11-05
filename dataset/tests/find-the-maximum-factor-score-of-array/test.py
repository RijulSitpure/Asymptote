from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxScore([2, 4, 8, 16]) == 64, "Example 1 failed"
    assert s.maxScore([1, 2, 3, 4, 5]) == 60, "Example 2 failed"
    assert s.maxScore([3]) == 9, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

