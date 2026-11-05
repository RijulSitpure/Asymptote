from solution import Solution

def run_tests():
    s = Solution()
    assert s.minCost(4, [[3, 5, 7], [6, 2, 9], [4, 8, 1], [7, 3, 5]]) == 9, "Example 1 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
