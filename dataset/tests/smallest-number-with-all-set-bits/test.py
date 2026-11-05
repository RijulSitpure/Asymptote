from solution import Solution

def run_tests():
    s = Solution()
    assert s.smallestNumber(5) == 7, "Example 1 failed"
    assert s.smallestNumber(10) == 15, "Example 2 failed"
    assert s.smallestNumber(3) == 3, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

