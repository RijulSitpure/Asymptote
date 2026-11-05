from solution import Solution

def run_tests():
    s = Solution()
    assert s.zigzagTraversal([[1, 2], [3, 4]]) == [1, 4], "Example 1 failed"
    assert s.zigzagTraversal([[2, 1], [2, 1], [2, 1]]) == [2, 1, 2], "Example 2 failed"
    assert s.zigzagTraversal([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == [1, 3, 5, 7, 9], "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

