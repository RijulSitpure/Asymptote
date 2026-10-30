from typing import List, Optional, Tuple, Dict, Set

class Solution:
    def findWinners(self, matches: list[list[int]]) -> list[list[int]]:
        losses = {}
        for winner, loser in matches:
            losses.setdefault(winner, 0)
            losses[loser] = losses.get(loser, 0) + 1
        zero_loss = sorted([p for p, l in losses.items() if l == 0])
        one_loss = sorted([p for p, l in losses.items() if l == 1])
        return [zero_loss, one_loss]
