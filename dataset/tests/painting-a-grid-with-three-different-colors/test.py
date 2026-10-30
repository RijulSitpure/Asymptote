class Solution:
    def colorTheGrid(self, m: int, n: int) -> int:
        MOD = 1_000_000_007
        
        valid_cols = []
        def gen(curr):
            if len(curr) == m:
                valid_cols.append(tuple(curr))
                return
            for c in range(3):
                if not curr or curr[-1] != c:
                    gen(curr + [c])
        gen([])
        
        adj = [[] for _ in range(len(valid_cols))]
        for i, c1 in enumerate(valid_cols):
            for j, c2 in enumerate(valid_cols):
                if all(c1[r] != c2[r] for r in range(m)):
                    adj[i].append(j)
                    
        dp = [1] * len(valid_cols)
        for _ in range(1, n):
            new_dp = [0] * len(valid_cols)
            for i in range(len(valid_cols)):
                cnt = dp[i]
                if cnt:
                    for nxt in adj[i]:
                        new_dp[nxt] = (new_dp[nxt] + cnt) % MOD
            dp = new_dp
            
        return sum(dp) % MOD

def test_color_the_grid():
    sol = Solution()
    assert sol.colorTheGrid(1, 1) == 3
    assert sol.colorTheGrid(1, 2) == 6
    assert sol.colorTheGrid(5, 5) == 580986

