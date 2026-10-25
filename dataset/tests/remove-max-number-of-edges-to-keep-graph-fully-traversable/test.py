class DSU:
    def __init__(self, n):
        self.p = list(range(n + 1))
        self.components = n
    def find(self, i):
        if self.p[i] == i:
            return i
        self.p[i] = self.find(self.p[i])
        return self.p[i]
    def union(self, i, j):
        pi, pj = self.find(i), self.find(j)
        if pi != pj:
            self.p[pi] = pj
            self.components -= 1
            return True
        return False

class Solution:
    def maxNumEdgesToRemove(self, n: int, edges: list[list[int]]) -> int:
        alice = DSU(n)
        bob = DSU(n)
        used = 0
        for t, u, v in edges:
            if t == 3:
                a = alice.union(u, v)
                b = bob.union(u, v)
                if a or b:
                    used += 1
        for t, u, v in edges:
            if t == 1:
                if alice.union(u, v):
                    used += 1
            elif t == 2:
                if bob.union(u, v):
                    used += 1
        if alice.components > 1 or bob.components > 1:
            return -1
        return len(edges) - used

def test():
    sol = Solution()
    assert sol.maxNumEdgesToRemove(4, [[3,1,2],[3,2,3],[1,1,3],[1,2,4],[1,1,2],[2,3,4]]) == 2, "test 1 failed"
    assert sol.maxNumEdgesToRemove(4, [[3,1,2],[3,2,3],[1,1,4],[2,1,4]]) == 0, "test 2 failed"
    assert sol.maxNumEdgesToRemove(4, [[3,2,3],[1,1,2],[2,3,4]]) == -1, "test 3 failed"
    print("✓ remove-max-number-of-edges-to-keep-graph-fully-traversable passed")

if __name__ == "__main__":
    test()
