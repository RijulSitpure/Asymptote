from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfGoodSubsets([4, 2, 3, 15]) == 5
    assert s.numberOfGoodSubsets([1, 2, 3, 4]) == 6
    print("All tests passed for the-number-of-good-subsets!")

if __name__ == "__main__":
    run_tests()
