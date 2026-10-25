class Solution:
    def closestCost(self, baseCosts: list[int], toppingCosts: list[int], target: int) -> int:
        self.best = baseCosts[0]

        def update(cost: int) -> None:
            if abs(cost - target) < abs(self.best - target):
                self.best = cost
            elif abs(cost - target) == abs(self.best - target) and cost < self.best:
                self.best = cost

        def dfs(idx: int, curr: int) -> None:
            update(curr)
            if curr >= target or idx == len(toppingCosts):
                return
            top = toppingCosts[idx]
            dfs(idx + 1, curr)
            dfs(idx + 1, curr + top)
            dfs(idx + 1, curr + 2 * top)

        for b in baseCosts:
            dfs(0, b)
        return self.best

def test():
    sol = Solution()
    assert sol.closestCost([1,7], [3,4], 10) == 10
    assert sol.closestCost([2,3], [4,5,100], 18) == 17
    assert sol.closestCost([3,10], [2,5], 9) == 8

    print("✓ closest-dessert-cost passed")

if __name__ == '__main__':
    test()
