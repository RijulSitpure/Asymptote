class Solution:
    def isWinner(self, player1: list[int], player2: list[int]) -> int:
        def get_score(p):
            total = 0
            for i in range(len(p)):
                mult = 2 if (i > 0 and p[i - 1] == 10) or (i > 1 and p[i - 2] == 10) else 1
                total += mult * p[i]
            return total
        s1, s2 = get_score(player1), get_score(player2)
        if s1 > s2:
            return 1
        elif s2 > s1:
            return 2
        return 0
