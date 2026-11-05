from solution import Solution

def run_tests():
    s = Solution()
    assert s.validSubstringCount("bcca", "abc") == 1, "Example 1 failed"
    assert s.validSubstringCount("abcabc", "abc") == 10, "Example 2 failed"
    assert s.validSubstringCount("abcabc", "aaabc") == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
