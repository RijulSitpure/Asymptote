class Solution:
    def countPairs(self, n: int, edges: list[list[int]]) -> int:
        parent = list(range(n))
        size = [1] * n
        
        def find(x: int) -> int:
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
            
        def union(u: int, v: int):
            ru, rv = find(u), find(v)
            if ru != rv:
                if size[ru] < size[rv]:
                    ru, rv = rv, ru
                parent[rv] = ru
                size[ru] += size[rv]
                
        for u, v in edges:
            union(u, v)
            
        total_pairs = n * (n - 1) // 2
        reachable_pairs = 0
        for i in range(n):
            if parent[i] == i:
                c = size[i]
                reachable_pairs += c * (c - 1) // 2
        return total_pairs - reachable_pairs
