class Solution:
    def minimumCardPickup(self, cards: list[int]) -> int:
        last_seen = {}
        min_len = float("inf")
        for i, card in enumerate(cards):
            if card in last_seen:
                min_len = min(min_len, i - last_seen[card] + 1)
            last_seen[card] = i
        return min_len if min_len != float("inf") else -1
