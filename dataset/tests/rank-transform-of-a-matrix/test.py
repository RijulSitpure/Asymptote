from collections import defaultdict

class Solution:
    def matrixRankTransform(self, matrix: list[list[int]]) -> list[list[int]]:
        m, n = len(matrix), len(matrix[0])
        val_map = defaultdict(list)
        for r in range(m):
            for c in range(n):
                val_map[matrix[r][c]].append((r, c))
        rank = [[0] * n for _ in range(m)]
        row_max = [0] * m
        col_max = [0] * n
        for val in sorted(val_map.keys()):
            parent = {}
            def find(x):
                if parent[x] != x:
                    parent[x] = find(parent[x])
                return parent[x]
            def union(x, y):
                rx, ry = find(x), find(y)
                if rx != ry:
                    parent[rx] = ry
            for r, c in val_map[val]:
                if r not in parent:
                    parent[r] = r
                if c + m not in parent:
                    parent[c + m] = c + m
                union(r, c + m)
            groups = defaultdict(list)
            for r, c in val_map[val]:
                groups[find(r)].append((r, c))
            for g in groups.values():
                mx = max(max(row_max[r], col_max[c]) for r, c in g) + 1
                for r, c in g:
                    rank[r][c] = mx
                    row_max[r] = mx
                    col_max[c] = mx
        return rank

def test():
    sol = Solution()
    assert sol.matrixRankTransform([[1,2],[3,4]]) == [[1,2],[2,3]]
    assert sol.matrixRankTransform([[7,7],[7,7]]) == [[1,1],[1,1]]
    assert sol.matrixRankTransform([[20,-21,14],[-19,4,19],[22,-47,24],[-19,4,19]]) == [[4,2,3],[1,3,4],[5,1,6],[1,3,4]]

    print("✓ rank-transform-of-a-matrix passed")

if __name__ == '__main__':
    test()
