class Solution:
    def minimumOperationsToWriteY(self, grid: list[list[int]]) -> int:
        n = len(grid)
        mid = n // 2
        y_counts = [0, 0, 0]
        non_y_counts = [0, 0, 0]
        for r in range(n):
            for c in range(n):
                is_y = (r <= mid and (r == c or r + c == n - 1)) or (r > mid and c == mid)
                val = grid[r][c]
                if is_y:
                    y_counts[val] += 1
                else:
                    non_y_counts[val] += 1
        total_y = sum(y_counts)
        total_non_y = sum(non_y_counts)
        ans = float('inf')
        for a in range(3):
            for b in range(3):
                if a != b:
                    changes = (total_y - y_counts[a]) + (total_non_y - non_y_counts[b])
                    ans = min(ans, changes)
        return ans
