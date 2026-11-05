from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxDistance("NWSE", 1) == 3, "Example 1 failed"
    assert s.maxDistance("NSWWEW", 3) == 6, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
