class Solution:
    def maximumValueSum(self, board: list[list[int]]) -> int:
        m, n = len(board), len(board[0])
        # Find top 3 (val, col) for each row
        row_top3 = []
        for r in range(m):
            row = [(board[r][c], c) for c in range(n)]
            row.sort(reverse=True)
            row_top3.append(row[:3])
            
        max_sum = -float('inf')
        for r1 in range(m):
            for r2 in range(r1 + 1, m):
                for r3 in range(r2 + 1, m):
                    for v1, c1 in row_top3[r1]:
                        for v2, c2 in row_top3[r2]:
                            if c2 == c1:
                                continue
                            for v3, c3 in row_top3[r3]:
                                if c3 == c1 or c3 == c2:
                                    continue
                                max_sum = max(max_sum, v1 + v2 + v3)
        return max_sum
