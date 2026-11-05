from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumWeight([[1, 3, 2], [4, 5, 2], [1, 5, 5], [6, 9, 3], [6, 7, 1], [8, 9, 1]]) == [2, 3], "Example 1 failed"
    assert s.maximumWeight([[5, 8, 1], [6, 7, 7], [4, 7, 3], [9, 10, 6], [7, 8, 2], [11, 14, 3], [9, 9, 5]]) == [1, 3, 5], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

