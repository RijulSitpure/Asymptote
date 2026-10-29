class TreeAncestor:
    def __init__(self, n: int, parent: list[int]):
        LOG = 16
        self.up = [[-1] * LOG for _ in range(n)]
        for i in range(n):
            self.up[i][0] = parent[i]
        for j in range(1, LOG):
            for i in range(n):
                if self.up[i][j - 1] != -1:
                    self.up[i][j] = self.up[self.up[i][j - 1]][j - 1]

    def getKthAncestor(self, node: int, k: int) -> int:
        LOG = 16
        for j in range(LOG):
            if (k >> j) & 1:
                node = self.up[node][j]
                if node == -1: break
        return node

ta = TreeAncestor(7, [-1, 0, 0, 1, 1, 2, 2])
assert ta.getKthAncestor(3, 1) == 1
assert ta.getKthAncestor(5, 2) == 0
assert ta.getKthAncestor(6, 3) == -1
print("All tests passed successfully.")
