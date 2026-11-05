from solution import Solution

def run_tests():
    s = Solution()
    assert s.makeStringGood("acab") == 1, "Example 1 failed"
    assert s.makeStringGood("wddw") == 0, "Example 2 failed"
    assert s.makeStringGood("aaabc") == 2, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

