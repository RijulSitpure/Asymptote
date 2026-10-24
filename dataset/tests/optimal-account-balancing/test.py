from collections import defaultdict
from typing import List

class Solution:
    def minTransfers(self, transactions: List[List[int]]) -> int:
        balance = defaultdict(int)
        for u, v, amount in transactions:
            balance[u] -= amount
            balance[v] += amount

        debts = [b for b in balance.values() if b != 0]
        n = len(debts)

        def dfs(start: int) -> int:
            while start < n and debts[start] == 0:
                start += 1
            if start == n:
                return 0
            min_ops = float("inf")
            for i in range(start + 1, n):
                if debts[start] * debts[i] < 0:
                    debts[i] += debts[start]
                    min_ops = min(min_ops, 1 + dfs(start + 1))
                    debts[i] -= debts[start]
                    if debts[start] + debts[i] == 0:
                        break
            return min_ops

        return dfs(0)

def test():
    sol = Solution()
    t1 = [[0,1,10],[2,0,5]]
    assert sol.minTransfers(t1) == 2, "test 1 failed"
    t2 = [[0,1,10],[1,0,1],[1,2,5],[2,0,5]]
    assert sol.minTransfers(t2) == 1, "test 2 failed"
    print("✓ optimal-account-balancing passed")

if __name__ == "__main__":
    test()
