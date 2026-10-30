class Solution:
    def checkMove(self, board: list[list[str]], rMove: int, cMove: int, color: str) -> bool:
        dirs = [(-1,-1), (-1,0), (-1,1), (0,-1), (0,1), (1,-1), (1,0), (1,1)]
        opp = "W" if color == "B" else "B"
        
        for dr, dc in dirs:
            r, c = rMove + dr, cMove + dc
            length = 1
            while 0 <= r < 8 and 0 <= c < 8 and board[r][c] == opp:
                r += dr
                c += dc
                length += 1
            if 0 <= r < 8 and 0 <= c < 8 and board[r][c] == color and length >= 2:
                return True
        return False

def test_check_move():
    sol = Solution()
    board = [
        [".",".",".","B",".",".",".","."],
        [".",".",".","W",".",".",".","."],
        [".",".",".","W",".",".",".","."],
        [".",".",".","W",".",".",".","."],
        ["W","B","B",".","W","W","W","B"],
        [".",".",".","W",".",".",".","."],
        [".",".",".","W",".",".",".","."],
        [".",".",".","B",".",".",".","."]
    ]
    assert sol.checkMove(board, 4, 3, "B") == True

