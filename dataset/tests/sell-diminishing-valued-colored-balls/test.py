class Solution:
    def maxProfit(self, inventory: list[int], orders: int) -> int:
        MOD = 10**9 + 7
        lo, hi = 0, max(inventory)
        threshold = 0
        while lo <= hi:
            mid = (lo + hi) // 2
            total_sold = sum(max(0, x - mid) for x in inventory)
            if total_sold <= orders:
                threshold = mid
                hi = mid - 1
            else:
                lo = mid + 1
        profit = 0
        sold = 0
        for x in inventory:
            if x > threshold:
                cnt = x - threshold
                profit = (profit + (threshold + 1 + x) * cnt // 2) % MOD
                sold += cnt
        rem = orders - sold
        profit = (profit + rem * threshold) % MOD
        return profit

def test():
    sol = Solution()
    assert sol.maxProfit([2,5], 4) == 14
    assert sol.maxProfit([3,5], 6) == 19
    assert sol.maxProfit([2,8,4,10,6], 20) == 110

    print("✓ sell-diminishing-valued-colored-balls passed")

if __name__ == '__main__':
    test()
