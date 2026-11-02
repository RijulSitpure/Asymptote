class Solution:
    def matrixSumQueries(self, n: int, queries: list[list[int]]) -> int:
        seen_rows = set()
        seen_cols = set()
        total = 0
        for q_type, idx, val in reversed(queries):
            if q_type == 0:
                if idx not in seen_rows:
                    seen_rows.add(idx)
                    total += val * (n - len(seen_cols))
            else:
                if idx not in seen_cols:
                    seen_cols.add(idx)
                    total += val * (n - len(seen_rows))
        return total
