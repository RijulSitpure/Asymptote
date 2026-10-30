from solution import Solution

def run_tests():
    s = Solution()
    assert s.isSameAfterReversals(526) is True
    assert s.isSameAfterReversals(1800) is False
    assert s.isSameAfterReversals(0) is True
    print("All tests passed for a-number-after-a-double-reversal!")

if __name__ == '__main__':
    run_tests()
