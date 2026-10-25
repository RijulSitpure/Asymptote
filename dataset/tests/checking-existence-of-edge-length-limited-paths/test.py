class Solution:
    def distanceLimitedPathsExist(self, n: int, edgeList: list[list[int]], queries: list[list[int]]) -> list[bool]:
        parent = list(range(n))

        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]

        def union(x: int, y: int) -> None:
            rx, ry = find(x), find(y)
            if rx != ry:
                parent[rx] = ry

        edgeList.sort(key=lambda e: e[2])
        indexed_queries = sorted(enumerate(queries), key=lambda x: x[1][2])
        res = [False] * len(queries)
        e_idx = 0
        m = len(edgeList)

        for q_idx, (u, v, limit) in indexed_queries:
            while e_idx < m and edgeList[e_idx][2] < limit:
                union(edgeList[e_idx][0], edgeList[e_idx][1])
                e_idx += 1
            res[q_idx] = (find(u) == find(v))
        return res

def test():
    sol = Solution()
    assert sol.distanceLimitedPathsExist(3, [[0,1,2],[1,2,4],[2,0,8],[1,0,16]], [[0,1,2],[0,2,5]]) == [False, True]
    assert sol.distanceLimitedPathsExist(5, [[0,1,10],[1,2,5],[2,3,9],[3,4,13]], [[0,4,14],[1,4,13]]) == [True, False]

    print("✓ checking-existence-of-edge-length-limited-paths passed")

if __name__ == '__main__':
    test()
