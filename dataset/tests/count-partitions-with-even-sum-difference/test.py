from solution import Solution

def run_tests():
    s = Solution()
    assert s.countPartitions([10, 10, 3, 7, 6]) == 4, "Example 1 failed"
    assert s.countPartitions([1, 2, 2]) == 0, "Example 2 failed"
    assert s.countPartitions([2, 4, 6, 8]) == 3, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
