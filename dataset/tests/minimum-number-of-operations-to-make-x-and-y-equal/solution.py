class Solution:
    def minimumOperationsToMakeEqual(self, x: int, y: int) -> int:
        from collections import deque
        if x <= y:
            return y - x
        q = deque([(x, 0)])
        vis = {x}
        while q:
            v, steps = q.popleft()
            if v == y:
                return steps
            nxts = []
            if v % 11 == 0: nxts.append(v // 11)
            if v % 5 == 0: nxts.append(v // 5)
            nxts.append(v - 1)
            nxts.append(v + 1)
            for nxt in nxts:
                if 0 < nxt <= x + 11 and nxt not in vis:
                    vis.add(nxt)
                    q.append((nxt, steps + 1))
        return abs(x - y)
