from solution import Solution

def run_tests():
    s = Solution()
    assert s.minBitwiseArray([2, 3, 5, 7]) == [-1, 1, 4, 3], "Example 1 failed"
    assert s.minBitwiseArray([11, 13, 31]) == [9, 12, 15], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
