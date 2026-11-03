class Solution:
    def maximumLength(self, s: str) -> int:
        runs = [[] for _ in range(26)]
        n = len(s)
        i = 0
        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            runs[ord(s[i]) - ord('a')].append(j - i)
            i = j
        ans = -1
        for lens in runs:
            if not lens:
                continue
            lens.sort(reverse=True)
            l1 = lens[0]
            l2 = lens[1] if len(lens) > 1 else 0
            l3 = lens[2] if len(lens) > 2 else 0
            cand = max(l1 - 2, min(l1 - 1, l2), l3)
            if cand > 0:
                ans = max(ans, cand)
        return ans
