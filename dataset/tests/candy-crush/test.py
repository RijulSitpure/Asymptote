import sys
from typing import List

class Solution:
    def candyCrush(self, board: List[List[int]]) -> List[List[int]]:
        R, C = len(board), len(board[0])
        todo = False
        for r in range(R):
            for c in range(C - 2):
                val = abs(board[r][c])
                if val != 0 and val == abs(board[r][c + 1]) == abs(board[r][c + 2]):
                    board[r][c] = -val
                    board[r][c + 1] = -val
                    board[r][c + 2] = -val
                    todo = True
        for r in range(R - 2):
            for c in range(C):
                val = abs(board[r][c])
                if val != 0 and val == abs(board[r + 1][c]) == abs(board[r + 2][c]):
                    board[r][c] = -val
                    board[r + 1][c] = -val
                    board[r + 2][c] = -val
                    todo = True
        if not todo:
            return board
        for c in range(C):
            write_r = R - 1
            for r in range(R - 1, -1, -1):
                if board[r][c] > 0:
                    board[write_r][c] = board[r][c]
                    write_r -= 1
            for r in range(write_r, -1, -1):
                board[r][c] = 0
        return self.candyCrush(board)

def test():
    sol = Solution()
    board = [
        [110,5,112,113,114],
        [210,211,5,213,214],
        [310,311,3,313,314],
        [410,411,412,5,414],
        [5,1,512,3,3],
        [610,4,1,613,614],
        [710,1,2,713,714],
        [810,1,2,1,1],
        [1,1,2,2,2],
        [4,1,4,4,1014]
    ]
    res = sol.candyCrush(board)
    assert res[0][0] == 0, "test 1 failed"
    print("✓ candy-crush passed")

if __name__ == "__main__":
    test()
