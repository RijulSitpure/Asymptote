from solution import Solution

def run_tests():
    s = Solution()
    assert s.validSequence("vbcca", "abc") == [0, 1, 2], "Example 1 failed"
    assert s.validSequence("bacdc", "abc") == [1, 2, 4], "Example 2 failed"
    assert s.validSequence("aaaaaa", "aaabc") == [], "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
