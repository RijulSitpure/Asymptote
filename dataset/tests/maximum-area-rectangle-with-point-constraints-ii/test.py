from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxRectangleArea([1,1,3,3], [1,3,1,3]) == 4, "Example 1 failed"
    assert s.maxRectangleArea([1,1,3,3,2], [1,3,1,3,2]) == -1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

