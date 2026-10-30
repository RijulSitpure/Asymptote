from typing import List, Optional, Tuple, Dict, Set

class ATM:
    def __init__(self):
        self.denoms = [20, 50, 100, 200, 500]
        self.counts = [0] * 5

    def deposit(self, banknotesCount: list[int]) -> None:
        for i in range(5):
            self.counts[i] += banknotesCount[i]

    def withdraw(self, amount: int) -> list[int]:
        take = [0] * 5
        for i in range(4, -1, -1):
            d = self.denoms[i]
            cnt = min(self.counts[i], amount // d)
            take[i] = cnt
            amount -= cnt * d
        if amount == 0:
            for i in range(5):
                self.counts[i] -= take[i]
            return take
        return [-1]
