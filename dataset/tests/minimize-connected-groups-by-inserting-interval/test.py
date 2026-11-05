from solution import Solution

def run_tests():
    s = Solution()
    assert s.minConnectedGroups([[1, 3], [5, 6], [8, 10]], 3) == 2, "Example 1 failed"
    assert s.minConnectedGroups([[5, 10], [1, 1], [3, 3]], 1) == 3, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
