from solution import Solution

def run_tests():
    s = Solution()
    assert s.smallestNumber(10, 2) == 10, "Example 1 failed"
    assert s.smallestNumber(15, 3) == 16, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

