class Solution:
    def countWinningSequences(self, s: str) -> int:
        MOD = 1_000_000_007
        n = len(s)
        
        # Creatures: 0: 'F', 1: 'W', 2: 'E'
        char_map = {'F': 0, 'W': 1, 'E': 2}
        bob_moves = [char_map[c] for c in s]
        
        # Outcome: alice vs bob
        # W beats F (+1), F beats E (+1), E beats W (+1)
        # Loss (-1), Tie (0)
        def get_score(a, b):
            if a == b:
                return 0
            if (a == 1 and b == 0) or (a == 0 and b == 2) or (a == 2 and b == 1):
                return 1
            return -1
            
        OFFSET = n
        # dp[last_move][diff]
        dp = [[0] * (2 * n + 1) for _ in range(4)]
        # 3 represents no previous move
        dp[3][OFFSET] = 1
        
        for b in bob_moves:
            next_dp = [[0] * (2 * n + 1) for _ in range(4)]
            for last in range(4):
                for diff in range(2 * n + 1):
                    count = dp[last][diff]
                    if count == 0:
                        continue
                    for a in range(3):
                        if a != last:
                            delta = get_score(a, b)
                            new_diff = diff + delta
                            if 0 <= new_diff <= 2 * n:
                                next_dp[a][new_diff] = (next_dp[a][new_diff] + count) % MOD
            dp = next_dp
            
        ans = 0
        for last in range(3):
            for diff in range(OFFSET + 1, 2 * n + 1):
                ans = (ans + dp[last][diff]) % MOD
        return ans
