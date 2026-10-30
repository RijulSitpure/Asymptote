from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxTotalFruits([[2, 8], [6, 3], [8, 6]], 5, 4) == 9
    assert s.maxTotalFruits([[0, 9], [4, 1], [5, 7], [6, 2], [7, 4], [10, 9]], 5, 4) == 14
    assert s.maxTotalFruits([[0, 3], [6, 4], [8, 5]], 3, 2) == 0
    print("All tests passed for maximum-fruits-harvested-after-at-most-k-steps!")

if __name__ == '__main__':
    run_tests()
