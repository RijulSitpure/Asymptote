from solution import Solution

def run_tests():
    s = Solution()
    assert s.findEvenNumbers([2, 1, 3, 0]) == [102, 120, 130, 132, 210, 230, 302, 310, 312, 320]
    assert s.findEvenNumbers([2, 2, 8, 8, 2]) == [222, 228, 282, 288, 822, 828, 882]
    assert s.findEvenNumbers([3, 7, 5]) == []
    print("All tests passed for finding-3-digit-even-numbers!")

if __name__ == '__main__':
    run_tests()
