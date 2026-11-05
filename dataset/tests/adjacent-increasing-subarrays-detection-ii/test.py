from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1]) == 3, "Example 1 failed"
    assert s.maxIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7]) == 2, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

