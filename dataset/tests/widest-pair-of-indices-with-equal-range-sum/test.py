from solution import Solution

def run_tests():
    s = Solution()
    assert s.widestPairOfIndices([1, 1, 0, 1], [0, 1, 1, 0]) == 3
    assert s.widestPairOfIndices([0, 1], [1, 1]) == 1
    assert s.widestPairOfIndices([0], [1]) == 0
    print("All tests passed for widest-pair-of-indices-with-equal-range-sum!")

if __name__ == "__main__":
    run_tests()
