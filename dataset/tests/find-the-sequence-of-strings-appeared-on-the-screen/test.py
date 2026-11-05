from solution import Solution

def run_tests():
    s = Solution()
    assert s.stringSequence("ab") == ["a", "aa", "ab"], "Example 1 failed"
    assert s.stringSequence("he") == ["a", "b", "c", "d", "e", "f", "g", "h", "ha", "hb", "hc", "hd", "he"], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
