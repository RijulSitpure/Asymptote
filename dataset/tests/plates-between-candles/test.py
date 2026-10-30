from solution import Solution

def run_tests():
    s = Solution()
    assert s.platesBetweenCandles("**|**|***|", [[2, 5], [5, 9]]) == [2, 3]
    assert s.platesBetweenCandles("***|**|*****|**||**|*", [[1, 17], [4, 5], [14, 17], [5, 11], [15, 16]]) == [9, 0, 0, 0, 0]
    print("All tests passed for plates-between-candles!")

if __name__ == "__main__":
    run_tests()
