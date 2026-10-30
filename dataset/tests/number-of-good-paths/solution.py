class Solution:
    def numberOfGoodPaths(self, vals: list[int], edges: list[list[int]]) -> int:
        n = len(vals)
        parent = list(range(n))
        max_val = list(vals)
        count = [1] * n
        
        def find(i):
            if parent[i] != i:
                parent[i] = find(parent[i])
            return parent[i]
        
        edges.sort(key=lambda e: max(vals[e[0]], vals[e[1]]))
        ans = n
        
        for u, v in edges:
            ru, rv = find(u), find(v)
            if ru != rv:
                if max_val[ru] == max_val[rv]:
                    ans += count[ru] * count[rv]
                    parent[rv] = ru
                    count[ru] += count[rv]
                elif max_val[ru] > max_val[rv]:
                    parent[rv] = ru
                else:
                    parent[ru] = rv
        return ans
