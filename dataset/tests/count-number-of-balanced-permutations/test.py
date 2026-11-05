from solution import Solution

def run_tests():
    s = Solution()
    assert s.countBalancedPermutations("123") == 2, "Example 1 failed"
    assert s.countBalancedPermutations("112") == 1, "Example 2 failed"
    assert s.countBalancedPermutations("12345") == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

