from typing import List

class Solution:
    def maxProfit(self, prices: List[int], strategy: List[int], k: int) -> int:
        n = len(prices)
        base_profit = sum(p * s for p, s in zip(prices, strategy))
        cur_gain = sum(prices[i] * (1 - strategy[i]) for i in range(min(k, n)))
        max_gain = max(0, cur_gain)
        for i in range(k, n):
            cur_gain += prices[i] * (1 - strategy[i])
            cur_gain -= prices[i - k] * (1 - strategy[i - k])
            max_gain = max(max_gain, cur_gain)
        return base_profit + max_gain

def run_tests():
    sol = Solution()
    assert sol.maxProfit([4, 2, 8], [-1, 0, 1], 2) == 14
    assert sol.maxProfit([1, 2, 3], [1, 1, 1], 1) == 6
    print("All tests passed for 3652.")

if __name__ == "__main__":
    run_tests()
