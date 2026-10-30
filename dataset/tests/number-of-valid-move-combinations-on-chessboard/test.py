from solution import Solution

def run_tests():
    s = Solution()
    assert s.countCombinations(["rook"], [[1, 1]]) == 15
    assert s.countCombinations(["queen"], [[1, 1]]) == 22
    assert s.countCombinations(["bishop"], [[4, 3]]) == 12
    print("All tests passed for number-of-valid-move-combinations-on-chessboard!")

if __name__ == "__main__":
    run_tests()
