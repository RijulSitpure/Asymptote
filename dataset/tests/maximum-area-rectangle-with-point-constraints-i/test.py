from solution import Solution

def run_tests():
    s = Solution()
    p1 = [[1,1],[1,3],[3,1],[3,3],[2,2]]
    assert s.maxRectangleArea(p1) == -1, "Example 1 failed"
    p2 = [[1,1],[1,3],[3,1],[3,3]]
    assert s.maxRectangleArea(p2) == 4, "Example 2 failed"
    p3 = [[1,1],[1,3],[3,1],[3,3],[1,2]]
    assert s.maxRectangleArea(p3) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

