class Solution:
    def minCostToMoveChips(self, position: list[int]) -> int:
        even = sum(1 for p in position if p % 2 == 0)
        odd = len(position) - even
        return min(even, odd)

def test():
    sol = Solution()
    assert sol.minCostToMoveChips([1, 2, 3]) == 1, "test 1 failed"
    assert sol.minCostToMoveChips([2, 2, 2, 3, 3]) == 2, "test 2 failed"
    assert sol.minCostToMoveChips([1, 1000000000]) == 1, "test 3 failed"
    print("✓ minimum-cost-to-move-chips-to-the-same-position passed")

if __name__ == "__main__":
    test()
