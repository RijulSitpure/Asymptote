import heapq

class Solution:
    def minOperations(self, n: int, m: int) -> int:
        limit = 10000
        is_prime = [True] * limit
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(limit**0.5) + 1):
            if is_prime[p]:
                for multiple in range(p * p, limit, p):
                    is_prime[multiple] = False
                    
        if is_prime[n] or is_prime[m]:
            return -1
            
        pq = [(n, n)]
        dist = {n: n}
        
        while pq:
            cost, curr = heapq.heappop(pq)
            if curr == m:
                return cost
            if cost > dist[curr]:
                continue
                
            s = str(curr)
            for i in range(len(s)):
                d = int(s[i])
                if d < 9:
                    nxt = int(s[:i] + str(d + 1) + s[i + 1:])
                    if not is_prime[nxt]:
                        if nxt not in dist or cost + nxt < dist[nxt]:
                            dist[nxt] = cost + nxt
                            heapq.heappush(pq, (cost + nxt, nxt))
                if d > 0 and (i > 0 or d > 1):
                    nxt = int(s[:i] + str(d - 1) + s[i + 1:])
                    if not is_prime[nxt]:
                        if nxt not in dist or cost + nxt < dist[nxt]:
                            dist[nxt] = cost + nxt
                            heapq.heappush(pq, (cost + nxt, nxt))
                            
        return -1
