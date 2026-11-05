from typing import List

class Solution:
    def maxProfit(self, prices: List[int], k: int) -> int:
        n = len(prices)
        if n == 0 or k == 0:
            return 0
        if k >= n // 2:
            return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, n))
            
        buy = [-float('inf')] * (k + 1)
        sell = [0] * (k + 1)
        
        for price in prices:
            for j in range(1, k + 1):
                buy[j] = max(buy[j], sell[j - 1] - price)
                sell[j] = max(sell[j], buy[j] + price)
                
        return sell[k]

def run_tests():
    s = Solution()
    res1 = s.maxProfit([2, 4, 1], 2)
    assert res1 == 2, f"Expected 2, got {res1}"
    res2 = s.maxProfit([3, 2, 6, 5, 0, 3], 2)
    assert res2 == 7, f"Expected 7, got {res2}"
    print("3573 best-time-to-buy-and-sell-stock-v PASSED")

if __name__ == "__main__":
    run_tests()
