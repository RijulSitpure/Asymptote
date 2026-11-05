class Solution:
    def minCost(self, s: str, t: str, flip_cost: int, swap_cost: int) -> int:
        c01 = sum(1 for a, b in zip(s, t) if a == '0' and b == '1')
        c10 = sum(1 for a, b in zip(s, t) if a == '1' and b == '0')
        
        pairs = min(c01, c10)
        rem = abs(c01 - c10)
        
        cost_with_swaps = pairs * min(swap_cost, 2 * flip_cost) + rem * flip_cost
        return cost_with_swaps

def run_tests():
    sol = Solution()
    assert sol.minCost("10", "01", 5, 2) == 2 # 1 swap costs 2 vs 2 flips = 10
    assert sol.minCost("10", "01", 1, 10) == 2 # 2 flips = 2 vs swap = 10
    assert sol.minCost("00", "11", 3, 2) == 6 # no complementary pairs -> 2 flips = 6
    print("All tests passed for 3800.")

if __name__ == "__main__":
    run_tests()
