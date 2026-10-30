from solution import Solution

def run_tests():
    s = Solution()
    assert s.getAverages([7, 4, 3, 9, 1, 8, 5, 2, 6], 3) == [-1, -1, -1, 5, 4, 4, -1, -1, -1]
    assert s.getAverages([100000], 0) == [100000]
    assert s.getAverages([8], 100000) == [-1]
    print("All tests passed for k-radius-subarray-averages!")

if __name__ == '__main__':
    run_tests()
