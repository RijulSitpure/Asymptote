from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumOperations([[1, 1, 0], [0, 1, 1], [1, 1, 1]]) == 3
    assert s.minimumOperations([[0, 0, 0], [0, 0, 0]]) == 0
    assert s.minimumOperations([[1, 1], [1, 1]]) == 2
    print("All tests passed for minimum-operations-to-remove-adjacent-ones-in-matrix!")

if __name__ == '__main__':
    run_tests()
