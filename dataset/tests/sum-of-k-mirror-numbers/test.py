from solution import Solution

def run_tests():
    s = Solution()
    assert s.kMirror(2, 5) == 25
    assert s.kMirror(3, 7) == 499
    assert s.kMirror(7, 17) == 20379000
    print("All tests passed for sum-of-k-mirror-numbers!")

if __name__ == '__main__':
    run_tests()
