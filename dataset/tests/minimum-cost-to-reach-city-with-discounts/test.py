from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumCost(5, [[0, 1, 4], [2, 1, 3], [1, 4, 11], [3, 2, 3], [0, 3, 2]], 1) == 9
    assert s.minimumCost(4, [[1, 3, 17], [1, 2, 7], [3, 2, 5], [0, 1, 6], [3, 0, 20]], 20) == 8
    assert s.minimumCost(4, [[0, 1, 3], [2, 3, 2]], 0) == -1
    print("All tests passed for minimum-cost-to-reach-city-with-discounts!")

if __name__ == '__main__':
    run_tests()
