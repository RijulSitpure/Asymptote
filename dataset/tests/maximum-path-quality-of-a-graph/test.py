from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximalPathQuality([0, 32, 10, 43], [[0, 1, 10], [1, 2, 15], [0, 3, 10]], 49) == 75
    assert s.maximalPathQuality([5, 10, 15, 20], [[0, 1, 10], [1, 2, 10], [0, 3, 10]], 30) == 25
    print("All tests passed for maximum-path-quality-of-a-graph!")

if __name__ == "__main__":
    run_tests()
