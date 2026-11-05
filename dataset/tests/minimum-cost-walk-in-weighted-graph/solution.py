class Solution:
    def minimumCost(self, n: int, edges: list[list[int]], query: list[list[int]]) -> list[int]:
        parent = list(range(n))
        and_val = [(1 << 30) - 1] * n

        def find(i):
            if parent[i] == i:
                return i
            parent[i] = find(parent[i])
            return parent[i]

        def union(i, j, w):
            root_i = find(i)
            root_j = find(j)
            if root_i != root_j:
                parent[root_i] = root_j
                and_val[root_j] &= and_val[root_i] & w
            else:
                and_val[root_j] &= w

        for u, v, w in edges:
            union(u, v, w)

        ans = []
        for s, t in query:
            if s == t:
                ans.append(0)
            else:
                rs, rt = find(s), find(t)
                if rs != rt:
                    ans.append(-1)
                else:
                    ans.append(and_val[rs])
        return ans
