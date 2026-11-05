from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxDifference("12233", 4) == -1, "Example 1 failed"
    assert s.maxDifference("1122211", 3) == 1, "Example 2 failed"
    assert s.maxDifference("110", 3) == -1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
