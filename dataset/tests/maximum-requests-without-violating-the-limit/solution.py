from collections import deque

def maxAcceptedRequests(requests: list[int], w: int, limit: int) -> int:
    q = deque()
    accepted = 0
    for t in requests:
        while q and q[0] <= t - w:
            q.popleft()
        if len(q) < limit:
            q.append(t)
            accepted += 1
    return accepted