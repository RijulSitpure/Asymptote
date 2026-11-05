from solution import Solution

def run_tests():
    s = Solution()
    assert s.countNonDecreasingSubarrays([6, 3, 1, 2, 4, 4], 7) == 17, "Example 1 failed"
    assert s.countNonDecreasingSubarrays([6, 3, 1, 3, 6], 4) == 12, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

