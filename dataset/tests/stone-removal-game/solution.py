class Solution:
    def canAliceWin(self, n: int) -> bool:
        rem = n
        take = 10
        alice_turn = True
        while rem >= take:
            rem -= take
            take -= 1
            alice_turn = not alice_turn
        return not alice_turn
