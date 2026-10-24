class Solution:
    def minimumCost(self, n: int, connections: list[list[int]]) -> int:
        connections.sort(key=lambda x: x[2])
        parent = list(range(n + 1))
        
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        total_cost = 0
        components = n
        for u, v, cost in connections:
            pu, pv = find(u), find(v)
            if pu != pv:
                parent[pu] = pv
                total_cost += cost
                components -= 1
                if components == 1:
                    return total_cost
        return total_cost if components == 1 else -1

def test():
    sol = Solution()
    assert sol.minimumCost(3, [[1,2,5],[1,3,6],[2,3,1]]) == 6, "test 1 failed"
    assert sol.minimumCost(4, [[1,2,3],[3,4,4]]) == -1, "test 2 failed"
    print("✓ connecting-cities-with-minimum-cost passed")

if __name__ == "__main__":
    test()
