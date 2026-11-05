from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.getSneakyNumbers([0, 1, 1, 0])
    assert sorted(res1) == [0, 1], "Example 1 failed"
    res2 = s.getSneakyNumbers([0, 3, 2, 1, 3, 2])
    assert sorted(res2) == [2, 3], "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
