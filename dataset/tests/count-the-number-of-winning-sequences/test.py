from solution import Solution

def run_tests():
    s = Solution()
    assert s.countWinningSequences("FFF") == 3, "Example 1 failed"
    assert s.countWinningSequences("FWEFW") == 18, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
