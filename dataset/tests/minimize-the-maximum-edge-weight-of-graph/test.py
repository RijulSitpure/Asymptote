from solution import Solution

def run_tests():
    s = Solution()
    assert s.minMaxWeight(5, [[1, 0, 1], [2, 0, 2], [3, 0, 1], [4, 3, 1], [2, 1, 1]], 2) == 1, "Example 1 failed"
    assert s.minMaxWeight(5, [[0, 1, 1], [0, 2, 2], [0, 3, 1], [0, 4, 1], [1, 2, 1], [1, 4, 1]], 1) == -1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

