from solution import Solution

def run_tests():
    s = Solution()
    assert s.canAliceWin(12) == True, "Example 1 failed"
    assert s.canAliceWin(1) == False, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

