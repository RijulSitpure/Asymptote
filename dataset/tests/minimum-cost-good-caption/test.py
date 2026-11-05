from solution import Solution

def run_tests():
    s = Solution()
    assert s.minCostGoodCaption("cdcd") == "cccc", "Example 1 failed"
    assert s.minCostGoodCaption("aca") == "aaa", "Example 2 failed"
    assert s.minCostGoodCaption("bcde") == "cccc", "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
