from solution import Solution

def run_tests():
    s = Solution()
    assert s.maxMoves(1, 1, [[0, 0]]) == 4, "Example 1 failed"
    assert s.maxMoves(0, 2, [[1, 1], [2, 2], [3, 3]]) == 8, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()
