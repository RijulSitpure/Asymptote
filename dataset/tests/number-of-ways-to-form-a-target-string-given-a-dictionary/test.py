class Solution:
    def numWays(self, words: list[str], target: str) -> int:
        MOD = 10**9 + 7
        L = len(words[0])
        T = len(target)
        col_count = [[0] * 26 for _ in range(L)]
        for w in words:
            for j, c in enumerate(w):
                col_count[j][ord(c) - 97] += 1
        dp = [0] * (T + 1)
        dp[0] = 1
        for j in range(L):
            for i in range(T, 0, -1):
                char_idx = ord(target[i - 1]) - 97
                cnt = col_count[j][char_idx]
                if cnt > 0:
                    dp[i] = (dp[i] + dp[i - 1] * cnt) % MOD
        return dp[T]

def test():
    sol = Solution()
    assert sol.numWays(["acca","bbbb","caca"], "aba") == 6
    assert sol.numWays(["abba","baab"], "bab") == 4

    print("✓ number-of-ways-to-form-a-target-string-given-a-dictionary passed")

if __name__ == '__main__':
    test()
