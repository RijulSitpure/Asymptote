from solution import Solution

def run_tests():
    s = Solution()
    assert s.countSubstrings("12936") == 11, "Example 1 failed"
    assert s.countSubstrings("5701283") == 18, "Example 2 failed"
    assert s.countSubstrings("10101") == 9, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
