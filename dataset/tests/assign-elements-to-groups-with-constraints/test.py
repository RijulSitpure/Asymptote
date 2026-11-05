from solution import Solution

def run_tests():
    s = Solution()
    assert s.assignElements([8, 4, 3, 2, 4], [4, 2]) == [0, 0, -1, 1, 0], "Example 1 failed"
    assert s.assignElements([2, 3, 5, 7], [5, 3, 3]) == [-1, 1, 0, -1], "Example 2 failed"
    assert s.assignElements([10, 21, 30, 41], [2, 1, 4]) == [0, 1, 0, 1], "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
