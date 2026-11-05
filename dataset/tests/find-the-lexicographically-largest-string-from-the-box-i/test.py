from solution import Solution

def run_tests():
    s = Solution()
    assert s.answerString("dbca", 2) == "dbc", "Example 1 failed"
    assert s.answerString("gggg", 4) == "g", "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

