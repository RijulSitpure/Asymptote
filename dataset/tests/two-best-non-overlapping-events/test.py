from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxTwoEvents([[1, 3, 2], [4, 5, 2], [2, 4, 3]]) == 4
    assert s.maxTwoEvents([[1, 3, 2], [4, 5, 2], [1, 5, 5]]) == 5
    assert s.maxTwoEvents([[1, 5, 3], [1, 5, 1], [6, 6, 5]]) == 8
    print("All tests passed for two-best-non-overlapping-events!")

if __name__ == "__main__":
    run_tests()
