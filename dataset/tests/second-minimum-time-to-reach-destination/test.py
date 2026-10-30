from solution import Solution

def run_tests():
    s = Solution()
    assert s.secondMinimum(5, [[1, 2], [1, 3], [1, 4], [3, 4], [4, 5]], 3, 5) == 13
    assert s.secondMinimum(2, [[1, 2]], 3, 2) == 11
    print("All tests passed for second-minimum-time-to-reach-destination!")

if __name__ == "__main__":
    run_tests()
