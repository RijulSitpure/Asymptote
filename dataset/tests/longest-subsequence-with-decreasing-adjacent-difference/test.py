from solution import Solution

def run_tests():
    s = Solution()
    assert s.longestSubsequence([16, 6, 3]) == 3, "Example 1 failed"
    assert s.longestSubsequence([6, 5, 3, 4, 2, 1]) == 4, "Example 2 failed"
    assert s.longestSubsequence([10, 20, 10, 19, 10, 20]) == 5, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

