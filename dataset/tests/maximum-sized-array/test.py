from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxSizedArray(10) == 2, "Example 1 failed"
    assert s.maxSizedArray(2) == 1, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

