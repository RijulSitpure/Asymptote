from solution import Solution

def run_tests():
    s = Solution()
    assert s.gcdValues([2, 3, 4], [0, 2, 2]) == [1, 2, 2], "Example 1 failed"
    assert s.gcdValues([4, 4, 2, 1], [5, 3, 1, 0]) == [4, 2, 1, 1], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
