class Solution:
    def pathsWithMaxScore(self, board: list[str]) -> list[int]:
        MOD = 10**9 + 7
        n = len(board)
        dp_score = [[-1] * n for _ in range(n)]
        dp_count = [[0] * n for _ in range(n)]
        dp_score[n - 1][n - 1] = 0
        dp_count[n - 1][n - 1] = 1
        for r in range(n - 1, -1, -1):
            for c in range(n - 1, -1, -1):
                if board[r][c] == "X" or dp_score[r][c] == -1:
                    continue
                cur_score = dp_score[r][c]
                for dr, dc in [(-1, 0), (0, -1), (-1, -1)]:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n and board[nr][nc] != "X":
                        add_val = 0 if board[nr][nc] == "E" else int(board[nr][nc])
                        nxt_score = cur_score + add_val
                        if nxt_score > dp_score[nr][nc]:
                            dp_score[nr][nc] = nxt_score
                            dp_count[nr][nc] = dp_count[r][c]
                        elif nxt_score == dp_score[nr][nc]:
                            dp_count[nr][nc] = (dp_count[nr][nc] + dp_count[r][c]) % MOD
        if dp_score[0][0] == -1:
            return [0, 0]
        return [dp_score[0][0], dp_count[0][0]]

def test():
    sol = Solution()
    assert sol.pathsWithMaxScore(["E23","2X2","12S"]) == [7,1], "test 1 failed"
    assert sol.pathsWithMaxScore(["E12","1X1","21S"]) == [4,2], "test 2 failed"
    assert sol.pathsWithMaxScore(["E11","XXX","11S"]) == [0,0], "test 3 failed"
    print("✓ number-of-paths-with-max-score passed")

if __name__ == "__main__":
    test()
