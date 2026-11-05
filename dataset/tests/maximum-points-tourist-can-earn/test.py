from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxScore(2, 1, [[2,3]], [[0,2],[1,0]]) == 3, "Example 1 failed"
    assert s.maxScore(3, 2, [[3,4,2],[2,1,2]], [[0,2,1],[2,0,4],[3,2,0]]) == 8, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

