import collections
import heapq

class Solution:
    def repeatLimitedString(self, s: str, repeatLimit: int) -> str:
        count = collections.Counter(s)
        max_h = [(-ord(c), c, cnt) for c, cnt in count.items()]
        heapq.heapify(max_h)
        res = []
        while max_h:
            neg_ord, ch, cnt = heapq.heappop(max_h)
            use = min(cnt, repeatLimit)
            res.append(ch * use)
            cnt -= use
            if cnt > 0:
                if not max_h:
                    break
                n_neg, n_ch, n_cnt = heapq.heappop(max_h)
                res.append(n_ch)
                n_cnt -= 1
                if n_cnt > 0:
                    heapq.heappush(max_h, (n_neg, n_ch, n_cnt))
                heapq.heappush(max_h, (neg_ord, ch, cnt))
        return "".join(res)
