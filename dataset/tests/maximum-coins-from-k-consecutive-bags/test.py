from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumCoins([[8, 10, 1], [1, 3, 2], [5, 6, 4]], 4) == 10, "Example 1 failed"
    assert s.maximumCoins([[1, 10, 3]], 2) == 6, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

