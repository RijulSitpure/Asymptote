from collections import Counter

class Solution:
    def takeCharacters(self, s: str, k: int) -> int:
        counts = Counter(s)
        if any(counts[c] < k for c in 'abc'):
            return -1
        max_rem = {c: counts[c] - k for c in 'abc'}
        cur = Counter()
        max_len = 0
        left = 0
        for right, ch in enumerate(s):
            cur[ch] += 1
            while cur[ch] > max_rem[ch]:
                cur[s[left]] -= 1
                left += 1
            if right - left + 1 > max_len:
                max_len = right - left + 1
        return len(s) - max_len
