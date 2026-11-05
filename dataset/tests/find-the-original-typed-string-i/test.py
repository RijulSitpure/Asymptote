from solution import Solution

def run_tests():
    s = Solution()
    assert s.possibleStringCount("abbcccc") == 5, "Example 1 failed"
    assert s.possibleStringCount("abcd") == 1, "Example 2 failed"
    assert s.possibleStringCount("aaaa") == 4, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

