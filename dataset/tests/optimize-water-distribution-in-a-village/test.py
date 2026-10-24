class Solution:
    def minCostToSupplyWater(self, n: int, wells: list[int], pipes: list[list[int]]) -> int:
        edges = []
        for i, cost in enumerate(wells):
            edges.append((cost, 0, i + 1))
        for u, v, cost in pipes:
            edges.append((cost, u, v))
        edges.sort()
        
        parent = list(range(n + 1))
        def find(x):
            if parent[x] != x:
                parent[x] = find(parent[x])
            return parent[x]
        
        total_cost = 0
        count = 0
        for cost, u, v in edges:
            pu, pv = find(u), find(v)
            if pu != pv:
                parent[pu] = pv
                total_cost += cost
                count += 1
                if count == n:
                    break
        return total_cost

def test():
    sol = Solution()
    assert sol.minCostToSupplyWater(3, [1,2,2], [[1,2,1],[2,3,1]]) == 3, "test 1 failed"
    assert sol.minCostToSupplyWater(2, [1,1], [[1,2,1]]) == 2, "test 2 failed"
    print("✓ optimize-water-distribution-in-a-village passed")

if __name__ == "__main__":
    test()
