from collections import defaultdict

class Solution:
    def minDeletionCost(self, s: str, cost: list[int]) -> int:
        char_costs = defaultdict(int)
        for ch, c in zip(s, cost):
            char_costs[ch] += c
        
        total_cost = sum(cost)
        max_retained = max(char_costs.values())
        return total_cost - max_retained

def run_tests():
    sol = Solution()
    assert sol.minDeletionCost("aba", [1, 5, 2]) == 3
    assert sol.minDeletionCost("aaaa", [1, 2, 3, 4]) == 0
    print("All tests passed for 3784.")

if __name__ == "__main__":
    run_tests()
