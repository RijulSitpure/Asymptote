from collections import deque

class Solution:
    def findInteger(self, k: int, digit1: int, digit2: int) -> int:
        digits = sorted(list(set([digit1, digit2])))
        q = deque()
        for d in digits:
            if d > 0:
                q.append(d)
        MAX_VAL = 2**31 - 1
        while q:
            curr = q.popleft()
            if curr > k and curr % k == 0:
                return curr
            for d in digits:
                nxt = curr * 10 + d
                if nxt <= MAX_VAL:
                    q.append(nxt)
        return -1
