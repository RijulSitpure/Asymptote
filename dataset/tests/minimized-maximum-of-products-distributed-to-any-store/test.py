from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimizedMaximum(6, [11, 6]) == 3
    assert s.minimizedMaximum(7, [15, 10, 10]) == 5
    assert s.minimizedMaximum(1, [100000]) == 100000
    print("All tests passed for minimized-maximum-of-products-distributed-to-any-store!")

if __name__ == "__main__":
    run_tests()
