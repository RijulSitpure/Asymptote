from solution import Solution

def run_tests():
    s = Solution()
    assert s.hasSpecialSubstring("aaabaaa", 3) is True, "Example 1 failed"
    assert s.hasSpecialSubstring("abc", 2) is False, "Example 2 failed"
    assert s.hasSpecialSubstring("h", 1) is True, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
