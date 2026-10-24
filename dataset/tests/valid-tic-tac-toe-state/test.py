from typing import List

class Solution:
    def validTicTacToe(self, board: List[str]) -> bool:
        x_count = sum(row.count('X') for row in board)
        o_count = sum(row.count('O') for row in board)

        if o_count not in (x_count, x_count - 1):
            return False

        def win(p: str) -> bool:
            for r in range(3):
                if board[r][0] == board[r][1] == board[r][2] == p:
                    return True
            for c in range(3):
                if board[0][c] == board[1][c] == board[2][c] == p:
                    return True
            if board[0][0] == board[1][1] == board[2][2] == p:
                return True
            if board[0][2] == board[1][1] == board[2][0] == p:
                return True
            return False

        x_win = win('X')
        o_win = win('O')

        if x_win and o_win:
            return False
        if x_win and x_count != o_count + 1:
            return False
        if o_win and x_count != o_count:
            return False

        return True

def test():
    sol = Solution()
    assert sol.validTicTacToe(["O  ", "   ", "   "]) is False, "test 1 failed"
    assert sol.validTicTacToe(["XOX", " X ", "   "]) is False, "test 2 failed"
    assert sol.validTicTacToe(["XOX", "O O", "XOX"]) is True, "test 3 failed"
    print("✓ valid-tic-tac-toe-state passed")

if __name__ == "__main__":
    test()
