from solution import Solution

def run_tests():
    s = Solution()
    assert s.goodDaysToRobBank([5, 3, 3, 3, 5, 6, 2], 2) == [2, 3]
    assert s.goodDaysToRobBank([1, 1, 1, 1, 1], 0) == [0, 1, 2, 3, 4]
    assert s.goodDaysToRobBank([1, 2, 3, 4, 5, 6], 2) == []
    print("All tests passed for find-good-days-to-rob-the-bank!")

if __name__ == '__main__':
    run_tests()
