class Solution:
    def remainingMethods(self, n: int, k: int, invocations: list[list[int]]) -> list[int]:
        from collections import deque
        adj = [[] for _ in range(n)]
        for u, v in invocations:
            adj[u].append(v)
            
        # BFS to find all methods reachable from suspicious method k
        suspicious = set()
        q = deque([k])
        suspicious.add(k)
        while q:
            u = q.popleft()
            for v in adj[u]:
                if v not in suspicious:
                    suspicious.add(v)
                    q.append(v)
                    
        # Check if any external method invokes a suspicious method
        for u, v in invocations:
            if u not in suspicious and v in suspicious:
                return list(range(n))
                
        return [i for i in range(n) if i not in suspicious]
