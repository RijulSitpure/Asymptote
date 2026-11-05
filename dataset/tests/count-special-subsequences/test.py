from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfSubsequences([1, 2, 3, 4, 3, 6, 1]) == 1, "Example 1 failed"
    assert s.numberOfSubsequences([3, 4, 3, 4, 3, 4, 3, 4]) == 3, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

