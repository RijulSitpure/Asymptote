from solution import Solution

def run_tests():
    s = Solution()
    assert s.smallestEqual([0, 1, 2]) == 0
    assert s.smallestEqual([4, 3, 2, 1]) == 2
    assert s.smallestEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]) == -1
    print("All tests passed for smallest-index-with-equal-value!")

if __name__ == "__main__":
    run_tests()
