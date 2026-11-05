from solution import Solution

def run_tests():
    s = Solution()
    assert s.minStartingIndex("abcdefg", "bcdffg") == 1, "Example 1 failed"
    assert s.minStartingIndex("abacaba", "zbacaba") == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
