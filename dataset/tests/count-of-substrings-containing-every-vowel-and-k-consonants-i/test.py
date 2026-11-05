from solution import Solution

def run_tests():
    s = Solution()
    assert s.countOfSubstrings("aeioqq", 1) == 0, "Example 1 failed"
    assert s.countOfSubstrings("aeiou", 0) == 1, "Example 2 failed"
    assert s.countOfSubstrings("ieaouqqieaouqq", 1) == 3, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
