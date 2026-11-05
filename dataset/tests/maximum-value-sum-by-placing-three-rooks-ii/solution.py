class Solution:
    def maximumValueSum(self, board: list[list[int]]) -> int:
        m, n = len(board), len(board[0])
        row_top3 = []
        for r in range(m):
            row = [(board[r][c], c) for c in range(n)]
            row.sort(reverse=True)
            row_top3.append(row[:3])
            
        def merge_top3(a, b):
            combined = a + b
            combined.sort(reverse=True)
            res = []
            seen_cols = set()
            for v, c in combined:
                if c not in seen_cols:
                    seen_cols.add(c)
                    res.append((v, c))
                    if len(res) == 3:
                        break
            return res
            
        pref = [None] * m
        pref[0] = row_top3[0]
        for r in range(1, m):
            pref[r] = merge_top3(pref[r - 1], row_top3[r])
            
        suff = [None] * m
        suff[-1] = row_top3[-1]
        for r in range(m - 2, -1, -1):
            suff[r] = merge_top3(suff[r + 1], row_top3[r])
            
        max_sum = -float('inf')
        for r in range(1, m - 1):
            for v2, c2 in row_top3[r]:
                for v1, c1 in pref[r - 1]:
                    if c1 == c2:
                        continue
                    for v3, c3 in suff[r + 1]:
                        if c3 == c1 or c3 == c2:
                            continue
                        max_sum = max(max_sum, v1 + v2 + v3)
        return max_sum
