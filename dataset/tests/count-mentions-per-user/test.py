from solution import Solution

def run_tests():
    s = Solution()
    events1 = [["MESSAGE", "10", "id1 id0"], ["OFFLINE", "11", "0"], ["MESSAGE", "71", "HERE"]]
    assert s.countMentions(2, events1) == [2, 2], "Example 1 failed"
    events2 = [["MESSAGE", "10", "id1 id0"], ["OFFLINE", "11", "0"], ["MESSAGE", "12", "ALL"]]
    assert s.countMentions(2, events2) == [2, 2], "Example 2 failed"
    events3 = [["OFFLINE", "10", "0"], ["MESSAGE", "12", "HERE"]]
    assert s.countMentions(2, events3) == [0, 1], "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
