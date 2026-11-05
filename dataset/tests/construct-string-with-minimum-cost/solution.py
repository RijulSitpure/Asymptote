class Solution:
    def minimumCost(self, target: str, words: list[str], costs: list[int]) -> int:
        by_len = {}
        for w, c in zip(words, costs):
            L = len(w)
            if L not in by_len:
                by_len[L] = {}
            if w not in by_len[L] or c < by_len[L][w]:
                by_len[L][w] = c
                
        n = len(target)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        lens = sorted(by_len.keys())
        
        for i in range(1, n + 1):
            if dp[i - 1] == float('inf') and all(dp[i - L] == float('inf') for L in lens if i >= L):
                continue
            for L in lens:
                if i < L:
                    break
                if dp[i - L] != float('inf'):
                    sub = target[i - L:i]
                    if sub in by_len[L]:
                        cost = dp[i - L] + by_len[L][sub]
                        if cost < dp[i]:
                            dp[i] = cost
                            
        return dp[n] if dp[n] != float('inf') else -1