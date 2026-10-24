from typing import List

class Solution:
    def numRookCaptures(self, board: List[List[str]]) -> int:
        r, c = 0, 0
        for i in range(8):
            for j in range(8):
                if board[i][j] == 'R':
                    r, c = i, j
                    break
        res = 0
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            while 0 <= nr < 8 and 0 <= nc < 8:
                if board[nr][nc] == 'B':
                    break
                if board[nr][nc] == 'p':
                    res += 1
                    break
                nr += dr
                nc += dc
        return res

def test():
    sol = Solution()
    board = [[".",".",".",".",".",".",".","."],
             [".",".",".","p",".",".",".","."],
             [".",".",".","R",".",".",".","p"],
             [".",".",".",".",".",".",".","."],
             [".",".",".",".",".",".",".","."],
             [".",".",".","p",".",".",".","."],
             [".",".",".",".",".",".",".","."],
             [".",".",".",".",".",".",".","."]]
    assert sol.numRookCaptures(board) == 3, "test 1 failed"
    print("✓ available-captures-for-rook passed")

if __name__ == "__main__":
    test()
