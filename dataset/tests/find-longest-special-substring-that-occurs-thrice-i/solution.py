class Solution:
    def maximumLength(self, s: str) -> int:
        from collections import defaultdict
        runs = defaultdict(list)
        n = len(s)
        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            runs[s[i]].append(j - i)
            i = j
        ans = -1
        for ch, lens in runs.items():
            lens.sort(reverse=True)
            l1 = lens[0]
            l2 = lens[1] if len(lens) > 1 else 0
            l3 = lens[2] if len(lens) > 2 else 0
            cand = max(l1 - 2, min(l1 - 1, l2), l3)
            if cand > 0:
                ans = max(ans, cand)
        return ans
