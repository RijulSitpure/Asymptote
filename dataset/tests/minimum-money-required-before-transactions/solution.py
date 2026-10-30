class Solution:
    def minimumMoney(self, transactions: list[list[int]]) -> int:
        total_loss = 0
        max_extra = 0
        for cost, cashback in transactions:
            if cost > cashback:
                total_loss += cost - cashback
                max_extra = max(max_extra, cashback)
            else:
                max_extra = max(max_extra, cost)
        return total_loss + max_extra
