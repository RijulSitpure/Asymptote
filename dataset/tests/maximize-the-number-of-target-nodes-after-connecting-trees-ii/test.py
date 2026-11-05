from solution import Solution

def run_tests():
    s = Solution()
    e1 = [[0,1],[0,2],[2,3],[2,4]]
    e2 = [[0,1],[0,2],[0,3],[2,7],[1,4],[4,5],[4,6]]
    assert s.maxTargetNodes(e1, e2) == [8, 7, 7, 8, 8], "Example 1 failed"
    e1_b = [[0,1],[0,2],[0,3],[0,4]]
    e2_b = [[0,1],[1,2],[2,3]]
    assert s.maxTargetNodes(e1_b, e2_b) == [3, 6, 6, 6, 6], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
