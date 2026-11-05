class Solution:
    def lengthAfterTransformations(self, s: str, t: int) -> int:
        MOD = 1_000_000_007
        cnt = [0] * 26
        for ch in s:
            cnt[ord(ch) - ord('a')] += 1
            
        for _ in range(t):
            next_cnt = [0] * 26
            for i in range(25):
                next_cnt[i + 1] = cnt[i]
            z = cnt[25]
            next_cnt[0] = (next_cnt[0] + z) % MOD
            next_cnt[1] = (next_cnt[1] + z) % MOD
            cnt = next_cnt
            
        return sum(cnt) % MOD
