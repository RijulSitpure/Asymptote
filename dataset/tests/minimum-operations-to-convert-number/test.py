from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumOperations([2, 4, 12], 2, 12) == 2
    assert s.minimumOperations([3, 5, 7], 0, -4) == 2
    assert s.minimumOperations([2, 8, 16], 0, 1) == -1
    print("All tests passed for minimum-operations-to-convert-number!")

if __name__ == "__main__":
    run_tests()
