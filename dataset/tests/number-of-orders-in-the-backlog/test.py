import heapq

class Solution:
    def getNumberOfBacklogOrders(self, orders: list[list[int]]) -> int:
        MOD = 10**9 + 7
        buy_pq = []   # max-heap (-price, amount)
        sell_pq = []  # min-heap (price, amount)

        for price, amount, order_type in orders:
            if order_type == 0:  # buy
                while amount > 0 and sell_pq and sell_pq[0][0] <= price:
                    sell_price, sell_amt = sell_pq[0]
                    matched = min(amount, sell_amt)
                    amount -= matched
                    if matched == sell_amt:
                        heapq.heappop(sell_pq)
                    else:
                        sell_pq[0] = (sell_price, sell_amt - matched)
                if amount > 0:
                    heapq.heappush(buy_pq, (-price, amount))
            else:  # sell
                while amount > 0 and buy_pq and -buy_pq[0][0] >= price:
                    buy_price_neg, buy_amt = buy_pq[0]
                    matched = min(amount, buy_amt)
                    amount -= matched
                    if matched == buy_amt:
                        heapq.heappop(buy_pq)
                    else:
                        buy_pq[0] = (buy_price_neg, buy_amt - matched)
                if amount > 0:
                    heapq.heappush(sell_pq, (price, amount))

        total = sum(amt for _, amt in buy_pq) + sum(amt for _, amt in sell_pq)
        return total % MOD

def test():
    sol = Solution()
    assert sol.getNumberOfBacklogOrders([[10,5,0],[15,2,1],[25,1,1],[30,4,0]]) == 6
    assert sol.getNumberOfBacklogOrders([[7,1000000000,1],[15,3,0],[5,999999995,0],[5,1,1]]) == 999999984

    print("✓ number-of-orders-in-the-backlog passed")

if __name__ == '__main__':
    test()
