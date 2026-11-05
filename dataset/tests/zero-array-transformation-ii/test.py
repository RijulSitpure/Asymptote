from solution import Solution

def run_tests():
    s = Solution()
    assert s.minZeroArray([2, 0, 2], [[0, 2, 1], [0, 2, 1], [1, 1, 3]]) == 2, "Example 1 failed"
    assert s.minZeroArray([4, 3, 2, 1], [[1, 3, 2], [0, 2, 1]]) == -1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

