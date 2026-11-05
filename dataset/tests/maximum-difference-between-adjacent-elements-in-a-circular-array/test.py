from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxAdjacentDistance([1, 2, 4]) == 3, "Example 1 failed"
    assert s.maxAdjacentDistance([-5, -10, -5]) == 5, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

