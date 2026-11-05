from solution import Solution

def run_tests():
    s = Solution()
    assert s.hasIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3) == True, "Example 1 failed"
    assert s.hasIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7], 5) == False, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

