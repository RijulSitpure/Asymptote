from solution import Solution

def run_tests():
    s = Solution()
    assert s.countKReducibleNumbers("111", 1) == 3, "Example 1 failed"
    assert s.countKReducibleNumbers("1000", 2) == 6, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

