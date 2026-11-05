from solution import Solution

def run_tests():
    s = Solution()
    assert s.findSubtreeSizes([-1,0,0,1,1,1], "abaabc") == [6,3,1,1,1,1], "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

