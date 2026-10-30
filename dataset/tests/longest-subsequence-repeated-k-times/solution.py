from collections import Counter, deque

class Solution:
    def longestSubsequenceRepeatedK(self, s: str, k: int) -> str:
        freq = Counter(s)
        valid_chars = sorted([c for c, cnt in freq.items() if cnt >= k], reverse=True)
        
        def is_subseq(sub: str) -> bool:
            it = iter(s)
            target = sub * k
            return all(c in it for c in target)
            
        q = deque([""])
        ans = ""
        while q:
            curr = q.popleft()
            for c in valid_chars:
                nxt = curr + c
                if is_subseq(nxt):
                    if len(nxt) > len(ans) or (len(nxt) == len(ans) and nxt > ans):
                        ans = nxt
                    q.append(nxt)
        return ans
