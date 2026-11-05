from solution import Solution

def run_tests():
    s = Solution()
    assert s.findSafeWalk([[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0]], 1) == True, "Example 1 failed"
    assert s.findSafeWalk([[0, 1, 1], [1, 1, 0], [1, 1, 0]], 2) == False, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
