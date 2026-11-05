from solution import Solution

def run_tests():
    s = Solution()
    assert s.isBalanced("1234") == False, "Example 1 failed"
    assert s.isBalanced("24123") == True, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

