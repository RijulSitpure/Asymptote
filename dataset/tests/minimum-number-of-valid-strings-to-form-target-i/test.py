from solution import Solution

def run_tests():
    s = Solution()
    assert s.minValidStrings(["a", "b", "c"], "abc") == 3, "Example 1 failed"
    assert s.minValidStrings(["b", "cc", "acc"], "ccb") == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
