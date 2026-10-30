from solution import Solution

def run_tests():
    s = Solution()
    assert s.kIncreasing([5, 4, 3, 2, 1], 1) == 4
    assert s.kIncreasing([4, 1, 5, 2, 6, 2], 2) == 0
    assert s.kIncreasing([4, 1, 5, 2, 6, 2], 3) == 2
    print("All tests passed for minimum-operations-to-make-the-array-k-increasing!")

if __name__ == '__main__':
    run_tests()
