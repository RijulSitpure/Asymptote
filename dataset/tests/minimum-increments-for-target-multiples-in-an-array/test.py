from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumIncrements([1, 2, 3], [4]) == 1, "Example 1 failed"
    assert s.minimumIncrements([8, 4], [10, 5]) == 2, "Example 2 failed"
    assert s.minimumIncrements([7, 9, 10], [7]) == 0, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
