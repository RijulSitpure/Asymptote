from solution import Solution

def run_tests():
    s = Solution()
    assert s.minLength("000001", 1) == 2, "Example 1 failed"
    assert s.minLength("0000", 2) == 1, "Example 2 failed"
    assert s.minLength("0101", 0) == 1, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

