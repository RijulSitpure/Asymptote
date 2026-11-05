from solution import Solution

def run_tests():
    s = Solution()
    assert s.possibleStringCount("aabbccdd", 7) == 5, "Example 1 failed"
    assert s.possibleStringCount("aabbccdd", 8) == 1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

