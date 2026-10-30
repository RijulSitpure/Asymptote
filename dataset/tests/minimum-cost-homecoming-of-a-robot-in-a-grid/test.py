from solution import Solution

def run_tests():
    s = Solution()
    assert s.minCost([1, 0], [2, 3], [5, 4, 3], [8, 2, 6, 7]) == 18
    assert s.minCost([0, 0], [0, 0], [5], [26]) == 0
    print("All tests passed for minimum-cost-homecoming-of-a-robot-in-a-grid!")

if __name__ == '__main__':
    run_tests()
