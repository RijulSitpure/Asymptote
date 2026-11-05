from solution import Solution

def run_tests():
    s = Solution()
    assert s.sumOfGoodSubsequences([1, 2, 1]) == 14, "Example 1 failed"
    assert s.sumOfGoodSubsequences([3, 4, 5]) == 40, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

