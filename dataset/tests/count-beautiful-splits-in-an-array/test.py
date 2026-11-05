from solution import Solution

def run_tests():
    s = Solution()
    assert s.beautifulSplits([1, 1, 2, 1]) == 2, "Example 1 failed"
    assert s.beautifulSplits([1, 2, 3, 4]) == 0, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

