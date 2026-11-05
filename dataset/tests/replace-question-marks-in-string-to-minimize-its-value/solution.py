class Solution:
    def minimizeStringValue(self, s: str) -> str:
        import heapq
        from collections import Counter
        cnt = Counter(c for c in s if c != '?')
        heap = [(cnt[chr(ord('a') + i)], chr(ord('a') + i)) for i in range(26)]
        heapq.heapify(heap)
        q_count = s.count('?')
        picks = []
        for _ in range(q_count):
            c_freq, ch = heapq.heappop(heap)
            picks.append(ch)
            heapq.heappush(heap, (c_freq + 1, ch))
        picks.sort()
        res = list(s)
        p_idx = 0
        for i in range(len(res)):
            if res[i] == '?':
                res[i] = picks[p_idx]
                p_idx += 1
        return ''.join(res)
