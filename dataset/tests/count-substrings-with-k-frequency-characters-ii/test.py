from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfSubstrings("abacb", 2) == 4, "Example 1 failed"
    assert s.numberOfSubstrings("abcde", 1) == 15, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

