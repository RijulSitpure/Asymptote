from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxGoodNumber([1, 2, 3]) == 30, "Example 1 failed"
    assert s.maxGoodNumber([2, 8, 16]) == 1296, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
