from solution import Solution

def run_tests():
    s = Solution()
    assert s.countMaxOrSubsets([3, 1]) == 2
    assert s.countMaxOrSubsets([2, 2, 2]) == 7
    assert s.countMaxOrSubsets([3, 2, 1, 5]) == 6
    print("All tests passed for count-number-of-maximum-bitwise-or-subsets!")

if __name__ == "__main__":
    run_tests()
