class Solution:
    def checkContradictions(self, equations: list[list[str]], values: list[float]) -> bool:
        parent = {}
        weight = {}
        
        def find(x: str) -> tuple[str, float]:
            if x not in parent:
                parent[x] = x
                weight[x] = 1.0
                return x, 1.0
            if parent[x] != x:
                p, w = find(parent[x])
                parent[x] = p
                weight[x] *= w
            return parent[x], weight[x]
            
        for (a, b), val in zip(equations, values):
            root_a, w_a = find(a)
            root_b, w_b = find(b)
            if root_a == root_b:
                if abs(w_a / w_b - val) > 1e-5:
                    return True
            else:
                parent[root_a] = root_b
                weight[root_a] = val * w_b / w_a
        return False
