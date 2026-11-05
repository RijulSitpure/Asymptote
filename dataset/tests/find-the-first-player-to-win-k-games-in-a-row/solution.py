class Solution:
    def findWinningPlayer(self, skills: list[int], k: int) -> int:
        cur_winner = 0
        consecutive_wins = 0
        n = len(skills)
        for i in range(1, n):
            if skills[cur_winner] > skills[i]:
                consecutive_wins += 1
            else:
                cur_winner = i
                consecutive_wins = 1
            if consecutive_wins == k:
                return cur_winner
        return cur_winner