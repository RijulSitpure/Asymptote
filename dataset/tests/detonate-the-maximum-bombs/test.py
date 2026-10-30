from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumDetonation([[2, 1, 3], [6, 1, 4]]) == 2
    assert s.maximumDetonation([[1, 1, 5], [10, 10, 5]]) == 1
    assert s.maximumDetonation([[1, 2, 3], [2, 3, 1], [3, 4, 2], [4, 5, 3], [5, 6, 4]]) == 5
    print("All tests passed for detonate-the-maximum-bombs!")

if __name__ == '__main__':
    run_tests()
