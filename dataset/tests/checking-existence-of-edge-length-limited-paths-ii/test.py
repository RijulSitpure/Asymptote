class DistanceLimitedPathsExist:
    def __init__(self, n: int, edgeList: list[list[int]]):
        edgeList.sort(key=lambda x: x[2])
        parent = list(range(2 * n))
        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]
        val = [0] * (2 * n)
        node_count = n
        adj = [[] for _ in range(2 * n)]
        for u, v, w in edgeList:
            ru, rv = find(u), find(v)
            if ru != rv:
                new_node = node_count
                node_count += 1
                val[new_node] = w
                parent[ru] = new_node
                parent[rv] = new_node
                adj[new_node].append(ru)
                adj[new_node].append(rv)
        self.LOG = 18
        self.up = [[0] * self.LOG for _ in range(node_count)]
        self.depth = [0] * node_count
        self.val = val
        visited = [False] * node_count
        for i in range(node_count - 1, -1, -1):
            if find(i) == i and not visited[i]:
                st = [i]
                visited[i] = True
                while st:
                    curr = st.pop()
                    for ch in adj[curr]:
                        if not visited[ch]:
                            visited[ch] = True
                            self.depth[ch] = self.depth[curr] + 1
                            self.up[ch][0] = curr
                            for k in range(1, self.LOG):
                                self.up[ch][k] = self.up[self.up[ch][k - 1]][k - 1]
                            st.append(ch)
        self.find_root = find

    def query(self, p: int, q: int, limit: int) -> bool:
        if self.find_root(p) != self.find_root(q):
            return False
        if self.depth[p] < self.depth[q]:
            p, q = q, p
        for k in range(self.LOG - 1, -1, -1):
            if self.depth[p] - (1 << k) >= self.depth[q]:
                p = self.up[p][k]
        if p == q:
            lca = p
        else:
            for k in range(self.LOG - 1, -1, -1):
                if self.up[p][k] != self.up[q][k]:
                    p = self.up[p][k]
                    q = self.up[q][k]
            lca = self.up[p][0]
        return self.val[lca] < limit

checker = DistanceLimitedPathsExist(6, [[0,2,4],[0,3,2],[1,2,3],[2,3,1],[4,5,5]])
assert checker.query(2, 3, 2) is True
assert checker.query(1, 3, 3) is False
assert checker.query(2, 0, 3) is True
assert checker.query(0, 5, 6) is False
print("All tests passed successfully.")
