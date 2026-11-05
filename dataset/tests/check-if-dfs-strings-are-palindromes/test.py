from solution import Solution

def run_tests():
    s = Solution()
    assert s.findAnswer([-1, 0, 0, 1, 1, 2], "aababa") == [True, True, False, True, True, True], "Example 1 failed"
    assert s.findAnswer([-1, 0, 0, 0, 0], "aabcb") == [True, True, True, True, True], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
