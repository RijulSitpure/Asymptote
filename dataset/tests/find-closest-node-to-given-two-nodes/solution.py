class Solution:
    def closestMeetingNode(self, edges: list[int], node1: int, node2: int) -> int:
        def get_dists(start):
            dist = [-1] * len(edges)
            cur = start
            d = 0
            while cur != -1 and dist[cur] == -1:
                dist[cur] = d
                d += 1
                cur = edges[cur]
            return dist
        d1 = get_dists(node1)
        d2 = get_dists(node2)
        min_dist = float('inf')
        ans = -1
        for i in range(len(edges)):
            if d1[i] != -1 and d2[i] != -1:
                mx = max(d1[i], d2[i])
                if mx < min_dist:
                    min_dist = mx
                    ans = i
        return ans
