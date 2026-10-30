from solution import Solution

def run_tests():
    s = Solution()
    assert s.minOperations([[2, 4], [6, 8]], 2) == 4
    assert s.minOperations([[1, 5], [2, 3]], 1) == 5
    assert s.minOperations([[1, 2], [3, 4]], 2) == -1
    print("All tests passed for minimum-operations-to-make-a-uni-value-grid!")

if __name__ == "__main__":
    run_tests()
