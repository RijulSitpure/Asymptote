class Solution:
    def minimumCost(self, target: str, words: list[str], costs: list[int]) -> int:
        n = len(target)
        dp = [float('inf')] * (n + 1)
        dp[0] = 0
        
        # word to min cost map
        word_cost = {}
        for w, c in zip(words, costs):
            if w not in word_cost or c < word_cost[w]:
                word_cost[w] = c
                
        for i in range(n):
            if dp[i] == float('inf'):
                continue
            for w, c in word_cost.items():
                if target.startswith(w, i):
                    if dp[i] + c < dp[i + len(w)]:
                        dp[i + len(w)] = dp[i] + c
                        
        return dp[n] if dp[n] != float('inf') else -1
