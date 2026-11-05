from solution import Solution

def run_tests():
    s = Solution()
    assert s.stableMountains([1, 2, 3, 4, 5], 2) == [3, 4], "Example 1 failed"
    assert s.stableMountains([10, 1, 10, 1, 10], 3) == [1, 3], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
