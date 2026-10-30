from solution import Solution

def run_tests():
    s = Solution()
    assert s.getDescentPeriods([3, 2, 1, 4]) == 7
    assert s.getDescentPeriods([8, 6, 7, 7]) == 4
    assert s.getDescentPeriods([1]) == 1
    print("All tests passed for number-of-smooth-descent-periods-of-a-stock!")

if __name__ == '__main__':
    run_tests()
