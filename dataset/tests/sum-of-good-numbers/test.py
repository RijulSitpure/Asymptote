from solution import Solution

def run_tests():
    s = Solution()
    assert s.sumOfGoodNumbers([1, 3, 2, 1, 5, 4], 2) == 12, "Example 1 failed"
    assert s.sumOfGoodNumbers([2, 1], 1) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
