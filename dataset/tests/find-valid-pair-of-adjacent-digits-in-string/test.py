from solution import Solution

def run_tests():
    s = Solution()
    assert s.findValidPair("2523533") == "23", "Example 1 failed"
    assert s.findValidPair("221") == "21", "Example 2 failed"
    assert s.findValidPair("15023") == "", "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
