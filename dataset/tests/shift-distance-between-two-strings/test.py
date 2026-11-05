from solution import Solution

def run_tests():
    s = Solution()
    assert s.shiftDistance("abab", "baba", [100]*26, [100]*26) == 400, "Example 1 failed"
    assert s.shiftDistance("a", "b", [1] + [100]*25, [100]*26) == 1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

