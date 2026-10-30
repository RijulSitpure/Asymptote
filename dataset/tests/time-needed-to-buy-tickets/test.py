from solution import Solution

def run_tests():
    s = Solution()
    assert s.timeRequiredToBuy([2, 3, 2], 2) == 6
    assert s.timeRequiredToBuy([5, 1, 1, 1], 0) == 8
    print("All tests passed for time-needed-to-buy-tickets!")

if __name__ == "__main__":
    run_tests()
