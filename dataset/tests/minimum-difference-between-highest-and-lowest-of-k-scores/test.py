from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumDifference([90], 1) == 0
    assert s.minimumDifference([9, 4, 1, 7], 2) == 2
    print("All tests passed for minimum-difference-between-highest-and-lowest-of-k-scores!")

if __name__ == "__main__":
    run_tests()
