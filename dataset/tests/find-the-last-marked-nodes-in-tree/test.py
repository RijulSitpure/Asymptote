from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.lastMarkedNodes([[0, 1], [0, 2]])
    assert res1 in [[1, 2, 1], [2, 1, 2], [1, 2, 2], [2, 1, 1]], "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
