from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxRemoval([2, 0, 2], [[0, 2], [0, 2], [1, 1]]) == 1, "Example 1 failed"
    assert s.maxRemoval([1, 1, 1, 1], [[1, 3], [0, 2], [1, 3], [1, 2]]) == 2, "Example 2 failed"
    assert s.maxRemoval([1, 2, 3, 4], [[0, 3]]) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

