from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxPathLength([[3, 1], [2, 2], [4, 1], [0, 0], [5, 3]], 1) == 3, "Example 1 failed"
    assert s.maxPathLength([[2, 1], [7, 0], [5, 6]], 2) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
