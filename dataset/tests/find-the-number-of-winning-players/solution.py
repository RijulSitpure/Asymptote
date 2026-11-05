class Solution:
    def winningPlayerCount(self, n: int, pick: list[list[int]]) -> int:
        from collections import defaultdict
        player_colors = [defaultdict(int) for _ in range(n)]
        for p, c in pick:
            player_colors[p][c] += 1
        
        winners = 0
        for i in range(n):
            if any(cnt > i for cnt in player_colors[i].values()):
                winners += 1
        return winners
