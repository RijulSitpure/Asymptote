from solution import Solution

def run_tests():
    s = Solution()
    assert s.countGoodArrays(3, 2, 1) == 4, "Example 1 failed"
    assert s.countGoodArrays(4, 2, 2) == 6, "Example 2 failed"
    assert s.countGoodArrays(5, 2, 0) == 2, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

