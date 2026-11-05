from solution import Solution

def run_tests():
    s = Solution()
    assert s.longestSpecialPath([[0, 1, 2], [1, 2, 3], [1, 3, 5], [1, 4, 4], [2, 5, 6]], [2, 1, 2, 1, 3, 1]) == [6, 2], "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
