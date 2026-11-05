from solution import Solution

def run_tests():
    s = Solution()
    assert s.calculateScore("aczzx") == 5, "Example 1 failed"
    assert s.calculateScore("abcdef") == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

