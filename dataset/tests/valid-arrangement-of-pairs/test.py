from solution import Solution

def run_tests():
    s = Solution()
    res1 = s.validArrangement([[5,1],[4,5],[11,9],[9,4]])
    assert len(res1) == 4
    for i in range(len(res1) - 1):
        assert res1[i][1] == res1[i + 1][0]

    res2 = s.validArrangement([[1,3],[3,2],[2,1]])
    assert len(res2) == 3
    for i in range(len(res2) - 1):
        assert res2[i][1] == res2[i + 1][0]
    print("All tests passed for valid-arrangement-of-pairs!")

if __name__ == '__main__':
    run_tests()
