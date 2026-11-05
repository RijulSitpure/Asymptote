from solution import Solution

def run_tests():
    s = Solution()
    assert s.minTimeToReach([[0,4],[4,4]]) == 7, "Example 1 failed"
    assert s.minTimeToReach([[0,0,0,0],[0,0,0,0]]) == 6, "Example 2 failed"
    assert s.minTimeToReach([[0,1],[1,2]]) == 4, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

