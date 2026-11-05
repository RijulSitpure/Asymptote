from solution import Solution

def run_tests():
    s = Solution()
    assert s.shortestMatchingSubstring("abaacbaecebce", "ba*c*ce") == 8, "Example 1 failed"
    assert s.shortestMatchingSubstring("baccbaadbc", "cc*baa*adb") == -1, "Example 2 failed"
    assert s.shortestMatchingSubstring("a", "**") == 0, "Example 3 failed"
    assert s.shortestMatchingSubstring("madam", "m*a*m") == 5, "Example 4 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
