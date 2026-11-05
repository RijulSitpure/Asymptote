from solution import Solution

def run_tests():
    s = Solution()
    assert s.subarraySum([2, 3, 1]) == 11, "Example 1 failed"
    assert s.subarraySum([3, 1, 1, 2]) == 13, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
