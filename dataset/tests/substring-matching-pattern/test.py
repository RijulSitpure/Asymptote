from solution import Solution

def run_tests():
    s = Solution()
    assert s.hasMatch("leetcode", "ee*e") == True, "Example 1 failed"
    assert s.hasMatch("car", "c*v") == False, "Example 2 failed"
    assert s.hasMatch("luck", "u*") == True, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

