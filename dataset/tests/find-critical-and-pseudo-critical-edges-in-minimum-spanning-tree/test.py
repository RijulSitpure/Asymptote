class UnionFind:
    def __init__(self, n):
        self.p = list(range(n))
        self.count = n
    def find(self, i):
        if self.p[i] == i:
            return i
        self.p[i] = self.find(self.p[i])
        return self.p[i]
    def union(self, i, j):
        pi, pj = self.find(i), self.find(j)
        if pi != pj:
            self.p[pi] = pj
            self.count -= 1
            return True
        return False

class Solution:
    def findCriticalAndPseudoCriticalEdges(self, n: int, edges: list[list[int]]) -> list[list[int]]:
        indexed_edges = [[u, v, w, i] for i, (u, v, w) in enumerate(edges)]
        indexed_edges.sort(key=lambda x: x[2])
        def get_mst(exclude=-1, include=-1):
            uf = UnionFind(n)
            weight = 0
            if include != -1:
                u, v, w = edges[include]
                uf.union(u, v)
                weight += w
            for u, v, w, i in indexed_edges:
                if i == exclude:
                    continue
                if uf.union(u, v):
                    weight += w
            return weight if uf.count == 1 else float("inf")
        base = get_mst()
        critical, pseudo = [], []
        for i in range(len(edges)):
            if get_mst(exclude=i) > base:
                critical.append(i)
            elif get_mst(include=i) == base:
                pseudo.append(i)
        return [critical, pseudo]

def test():
    sol = Solution()
    assert sol.findCriticalAndPseudoCriticalEdges(5, [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]) == [[0,1],[2,3,4,5]], "test 1 failed"
    assert sol.findCriticalAndPseudoCriticalEdges(4, [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]) == [[],[0,1,2,3]], "test 2 failed"
    print("✓ find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree passed")

if __name__ == "__main__":
    test()
