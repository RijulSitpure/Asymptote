class Solution:
    def makeConnected(self, n: int, connections: list[list[int]]) -> int:
        if len(connections) < n - 1:
            return -1
        parent = list(range(n))
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        components = n
        for u, v in connections:
            ru, rv = find(u), find(v)
            if ru != rv:
                parent[ru] = rv
                components -= 1
        return components - 1

def test():
    sol = Solution()
    assert sol.makeConnected(4, [[0,1],[0,2],[1,2]]) == 1, "test 1 failed"
    assert sol.makeConnected(6, [[0,1],[0,2],[0,3],[1,2],[1,3]]) == 2, "test 2 failed"
    assert sol.makeConnected(6, [[0,1],[0,2],[0,3],[1,2]]) == -1, "test 3 failed"
    print("✓ number-of-operations-to-make-network-connected passed")

if __name__ == "__main__":
    test()
