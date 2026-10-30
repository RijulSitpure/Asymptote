from collections import Counter

class Solution:
    def rearrangeCharacters(self, s: str, target: str) -> int:
        s_cnt = Counter(s)
        t_cnt = Counter(target)
        return min(s_cnt[ch] // t_cnt[ch] for ch in t_cnt)
