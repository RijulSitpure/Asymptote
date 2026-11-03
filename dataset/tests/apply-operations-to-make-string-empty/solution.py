from collections import Counter

class Solution:
    def lastNonEmptyString(self, s: str) -> str:
        cnt = Counter(s)
        mx = max(cnt.values())
        last_pos = {}
        for i, ch in enumerate(s):
            if cnt[ch] == mx:
                last_pos[ch] = i
        return ''.join(sorted(last_pos.keys(), key=lambda ch: last_pos[ch]))
