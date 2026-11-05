from solution import Solution

def run_tests():
    s = Solution()
    edges1 = [[0,1,4],[0,2,2],[2,3,12],[2,4,6]]
    assert s.maximizeSumOfWeights(edges1, 2) == 22, "Example 1 failed"
    edges2 = [[0,1,5],[1,2,10],[0,3,15],[3,4,20],[3,5,5],[0,6,10]]
    assert s.maximizeSumOfWeights(edges2, 3) == 65, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
