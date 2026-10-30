from solution import Solution

def run_tests():
    s = Solution()
    assert s.shareCandies([1, 2, 2, 3, 4, 3], 3) == 3
    assert s.shareCandies([2, 2, 2, 2, 2, 2], 2) == 1
    assert s.shareCandies([2, 4, 5], 0) == 3
    print("All tests passed for number-of-unique-flavors-after-sharing-k-candies!")

if __name__ == '__main__':
    run_tests()
