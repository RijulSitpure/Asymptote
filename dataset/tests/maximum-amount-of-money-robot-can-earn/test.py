from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumAmount([[0, 1, -1], [1, -2, 3], [2, -3, 4]]) == 8, "Example 1 failed"
    assert s.maximumAmount([[10, 10, 10], [10, 10, 10]]) == 40, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

