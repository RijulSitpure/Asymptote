import sys
from typing import List

class Solution:
    def updateBoard(self, board: List[List[str]], click: List[int]) -> List[List[str]]:
        r, c = click[0], click[1]
        if board[r][c] == "M":
            board[r][c] = "X"
            return board

        m, n = len(board), len(board[0])
        dirs = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]

        def count_mines(cr: int, cc: int) -> int:
            count = 0
            for dr, dc in dirs:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == "M":
                    count += 1
            return count

        def dfs(cr: int, cc: int):
            if not (0 <= cr < m and 0 <= cc < n) or board[cr][cc] != "E":
                return
            mine_count = count_mines(cr, cc)
            if mine_count > 0:
                board[cr][cc] = str(mine_count)
            else:
                board[cr][cc] = "B"
                for dr, dc in dirs:
                    dfs(cr + dr, cc + dc)

        dfs(r, c)
        return board

def test():
    sol = Solution()
    b1 = [
        ["E","E","E","E","E"],
        ["E","E","M","E","E"],
        ["E","E","E","E","E"],
        ["E","E","E","E","E"]
    ]
    sol.updateBoard(b1, [3, 0])
    assert b1[3][0] == "B", "test 1 failed"
    assert b1[1][2] == "M", "test 1 mine unchanged"
    
    b2 = [
        ["B","1","E","1","B"],
        ["B","1","M","1","B"],
        ["B","1","1","1","B"],
        ["B","B","B","B","B"]
    ]
    sol.updateBoard(b2, [1, 2])
    assert b2[1][2] == "X", "test 2 failed"
    print("✓ minesweeper passed")

if __name__ == "__main__":
    test()
