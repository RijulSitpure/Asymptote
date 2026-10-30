from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.recoverArray([2, 10, 6, 4, 8, 12])
    assert sorted(res1) == [3, 7, 11] or sorted(res1) == [5, 7, 9]

    res2 = s.recoverArray([1, 1, 3, 3])
    assert sorted(res2) == [2, 2]
    print("All tests passed for recover-the-original-array!")

if __name__ == '__main__':
    run_tests()
