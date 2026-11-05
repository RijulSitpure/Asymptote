from solution import Solution

def run_tests():
    s = Solution()
    assert s.isPossibleToRearrange("abcd", "cdab", 2) == True, "Example 1 failed"
    assert s.isPossibleToRearrange("aabbcc", "bbaacc", 3) == True, "Example 2 failed"
    assert s.isPossibleToRearrange("aabbcc", "bbaacc", 2) == False, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

