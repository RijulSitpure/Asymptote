from solution import Solution

def run_tests():
    s = Solution()
    assert s.remainingMethods(4, 1, [[1, 2], [0, 1], [3, 2]]) == [0, 1, 2, 3], "Example 1 failed"
    assert s.remainingMethods(5, 0, [[1, 2], [0, 2], [0, 1], [3, 4]]) == [3, 4], "Example 2 failed"
    assert s.remainingMethods(3, 2, [[1, 2], [0, 1], [2, 0]]) == [], "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
