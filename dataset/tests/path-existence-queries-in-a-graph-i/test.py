class Solution:
    def pathExistenceQueries(self, n: int, nums: list[int], maxDiff: int, queries: list[list[int]]) -> list[bool]:
        parent = list(range(n))
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
        def union(i, j):
            pi, pj = find(i), find(j)
            if pi != pj:
                parent[pi] = pj
        for i in range(1, n):
            if abs(nums[i] - nums[i - 1]) <= maxDiff:
                union(i, i - 1)
        return [find(u) == find(v) for u, v in queries]

def run_tests():
    s = Solution()
    assert s.pathExistenceQueries(3, [1, 3, 5], 2, [[0, 1], [0, 2]]) == [True, True]
    assert s.pathExistenceQueries(3, [1, 10, 20], 2, [[0, 1]]) == [False]
    print("All tests passed for path-existence-queries-in-a-graph-i")

if __name__ == '__main__':
    run_tests()
