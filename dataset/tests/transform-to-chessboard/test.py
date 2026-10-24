from typing import List

class Solution:
    def movesToChessboard(self, board: List[List[int]]) -> int:
        n = len(board)
        for r in range(n):
            for c in range(n):
                if board[r][c] ^ board[0][c] ^ board[r][0] ^ board[0][0] != 0:
                    return -1

        row_ones = sum(board[0])
        col_ones = sum(board[r][0] for r in range(n))
        if row_ones < n // 2 or row_ones > (n + 1) // 2:
            return -1
        if col_ones < n // 2 or col_ones > (n + 1) // 2:
            return -1

        row_diff = sum(board[r][0] != r % 2 for r in range(n))
        col_diff = sum(board[0][c] != c % 2 for c in range(n))

        if n % 2 == 0:
            row_moves = min(row_diff, n - row_diff) // 2
            col_moves = min(col_diff, n - col_diff) // 2
        else:
            if row_diff % 2 != 0:
                row_diff = n - row_diff
            if col_diff % 2 != 0:
                col_diff = n - col_diff
            row_moves = row_diff // 2
            col_moves = col_diff // 2

        return row_moves + col_moves

def test():
    sol = Solution()
    b1 = [
        [0, 1, 1, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 1]
    ]
    assert sol.movesToChessboard(b1) == 2, "test 1 failed"
    assert sol.movesToChessboard([[0, 1], [1, 0]]) == 0, "test 2 failed"
    assert sol.movesToChessboard([[1, 0], [1, 0]]) == -1, "test 3 failed"
    print("✓ transform-to-chessboard passed")

if __name__ == "__main__":
    test()
