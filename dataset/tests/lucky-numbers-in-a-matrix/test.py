class Solution:
    def luckyNumbers(self, matrix: list[list[int]]) -> list[int]:
        row_mins = {min(row) for row in matrix}
        col_maxs = {max(matrix[r][c] for r in range(len(matrix))) for c in range(len(matrix[0]))}
        return list(row_mins & col_maxs)

def test():
    sol = Solution()
    assert sol.luckyNumbers([[3,7,8],[9,11,13],[15,16,17]]) == [15], "test 1 failed"
    assert sol.luckyNumbers([[1,10,4,2],[9,3,8,7],[15,16,17,12]]) == [12], "test 2 failed"
    print("✓ lucky-numbers-in-a-matrix passed")

if __name__ == "__main__":
    test()
