from solution import Solution

def run_tests():
    s = Solution()
    assert s.largestEvenSum([4, 1, 5, 3, 1], 3) == 12
    assert s.largestEvenSum([4, 6, 2], 3) == 12
    assert s.largestEvenSum([1, 3, 5], 1) == -1
    print("All tests passed for subsequence-of-size-k-with-the-largest-even-sum!")

if __name__ == '__main__':
    run_tests()
