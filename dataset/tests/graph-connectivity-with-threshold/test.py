class Solution:
    def areConnected(self, n: int, threshold: int, queries: list[list[int]]) -> list[bool]:
        parent = list(range(n + 1))

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> None:
            root_x, root_y = find(x), find(y)
            if root_x != root_y:
                parent[root_x] = root_y

        if threshold == 0:
            return [True] * len(queries)

        for d in range(threshold + 1, n + 1):
            for mult in range(2 * d, n + 1, d):
                union(d, mult)

        return [find(u) == find(v) for u, v in queries]

def test():
    sol = Solution()
    assert sol.areConnected(6, 2, [[1,4],[2,5],[3,6]]) == [False, False, True]
    assert sol.areConnected(6, 0, [[4,5],[3,4],[3,2],[2,6],[1,3]]) == [True, True, True, True, True]
    assert sol.areConnected(5, 1, [[4,5],[4,2],[2,4]]) == [False, True, True]

    print("✓ graph-connectivity-with-threshold passed")

if __name__ == '__main__':
    test()
