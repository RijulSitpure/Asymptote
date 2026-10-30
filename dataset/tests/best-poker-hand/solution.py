from collections import Counter

class Solution:
    def bestHand(self, ranks: list[int], suits: list[str]) -> str:
        if len(set(suits)) == 1:
            return 'Flush'
        mx = max(Counter(ranks).values())
        if mx >= 3:
            return 'Three of a Kind'
        if mx == 2:
            return 'Pair'
        return 'High Card'
