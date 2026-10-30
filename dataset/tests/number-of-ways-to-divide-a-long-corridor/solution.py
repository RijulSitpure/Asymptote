class Solution:
    def numberOfWays(self, corridor: str) -> int:
        MOD = 10**9 + 7
        seat_indices = [i for i, ch in enumerate(corridor) if ch == 'S']
        if len(seat_indices) == 0 or len(seat_indices) % 2 != 0:
            return 0
        ans = 1
        for i in range(1, len(seat_indices) - 1, 2):
            gap = seat_indices[i + 1] - seat_indices[i]
            ans = (ans * gap) % MOD
        return ans
