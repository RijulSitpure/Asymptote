class DSU:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.pot = [0] * n

    def find(self, x: int) -> tuple[int, int]:
        if self.parent[x] != x:
            p, par_pot = self.find(self.parent[x])
            self.parent[x] = p
            self.pot[x] ^= par_pot
        return self.parent[x], self.pot[x]

    def union(self, u: int, v: int, w: int) -> bool:
        root_u, pot_u = self.find(u)
        root_v, pot_v = self.find(v)
        parity = w % 2
        if root_u == root_v:
            cycle_parity = pot_u ^ pot_v ^ parity
            return cycle_parity == 0
        else:
            self.parent[root_u] = root_v
            self.pot[root_u] = pot_u ^ pot_v ^ parity
            return False

def evenWeightedCycleQueries(n: int, edges: list[list[int]]) -> list[bool]:
    dsu = DSU(n)
    ans = []
    found_even_cycle = False
    for u, v, w in edges:
        if dsu.union(u, v, w):
            found_even_cycle = True
        ans.append(found_even_cycle)
    return ans