from solution import Solution

def run_tests():
    s = Solution()
    assert s.subArrayRanges([1, 2, 3]) == 4
    assert s.subArrayRanges([1, 3, 3]) == 4
    assert s.subArrayRanges([4, -2, -3, 4, 1]) == 59
    print("All tests passed for sum-of-subarray-ranges!")

if __name__ == '__main__':
    run_tests()
