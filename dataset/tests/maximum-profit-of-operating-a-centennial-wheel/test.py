class Solution:
    def minOperationsMaxProfit(self, customers: list[int], boardingCost: int, runningCost: int) -> int:
        waiting = 0
        boarded = 0
        max_profit = 0
        best_rotations = -1
        rotations = 0
        i = 0
        while i < len(customers) or waiting > 0:
            if i < len(customers):
                waiting += customers[i]
                i += 1
            board = min(4, waiting)
            waiting -= board
            boarded += board
            rotations += 1
            profit = boarded * boardingCost - rotations * runningCost
            if profit > max_profit:
                max_profit = profit
                best_rotations = rotations
        return best_rotations

def test():
    sol = Solution()
    assert sol.minOperationsMaxProfit([8, 3], 5, 6) == 3
    assert sol.minOperationsMaxProfit([10, 9, 6], 6, 4) == 7
    assert sol.minOperationsMaxProfit([3, 4, 0, 5, 1], 1, 92) == -1

    print("✓ maximum-profit-of-operating-a-centennial-wheel passed")

if __name__ == '__main__':
    test()
