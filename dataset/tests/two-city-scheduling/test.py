from typing import List

class Solution:
    def twoCitySchedCost(self, costs: List[List[int]]) -> int:
        costs.sort(key=lambda x: x[0] - x[1])
        n = len(costs) // 2
        total = 0
        for i in range(n):
            total += costs[i][0] + costs[i + n][1]
        return total

def test():
    sol = Solution()
    c1 = [[10,20],[30,200],[400,50],[30,20]]
    assert sol.twoCitySchedCost(c1) == 110, "test 1 failed"
    c2 = [[259,770],[448,54],[926,667],[184,139],[840,118],[577,469]]
    assert sol.twoCitySchedCost(c2) == 1859, "test 2 failed"
    print("✓ two-city-scheduling passed")

if __name__ == "__main__":
    test()
