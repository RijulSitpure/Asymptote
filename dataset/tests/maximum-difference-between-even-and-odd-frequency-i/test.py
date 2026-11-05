from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxDifference("aaaaabbc") == 3, "Example 1 failed"
    assert s.maxDifference("abcabcab") == 1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
