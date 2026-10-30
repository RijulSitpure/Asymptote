class Solution:
    def checkValidGrid(self, m: int, n: int, r: int, c: int) -> list[list[int]]:
        board = [[-1] * n for _ in range(m)]
        board[r][c] = 0
        moves = [(-2, -1), (-2, 1), (-1, -2), (-1, 2), (1, -2), (1, 2), (2, -1), (2, 1)]
        def get_degree(cr, cc):
            cnt = 0
            for dr, dc in moves:
                nr, nc = cr + dr, cc + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == -1:
                    cnt += 1
            return cnt
        def dfs(curr_r, curr_c, step):
            if step == m * n:
                return True
            candidates = []
            for dr, dc in moves:
                nr, nc = curr_r + dr, curr_c + dc
                if 0 <= nr < m and 0 <= nc < n and board[nr][nc] == -1:
                    candidates.append((get_degree(nr, nc), nr, nc))
            candidates.sort(key=lambda x: x[0])
            for _, nr, nc in candidates:
                board[nr][nc] = step
                if dfs(nr, nc, step + 1):
                    return True
                board[nr][nc] = -1
            return False
        dfs(r, c, 1)
        return board
