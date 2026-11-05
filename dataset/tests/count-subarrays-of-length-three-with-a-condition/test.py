from solution import Solution

def run_tests():
    s = Solution()
    assert s.countSubarrays([1, 2, 1, 4, 1]) == 1, "Example 1 failed"
    assert s.countSubarrays([1, 1, 1]) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

