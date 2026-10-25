import heapq
import bisect

class Solution:
    def busiestServers(self, k: int, arrival: list[int], load: list[int]) -> list[int]:
        busy = []  # (end_time, server_id)
        avail = list(range(k))
        count = [0] * k
        for i, (t, l) in enumerate(zip(arrival, load)):
            while busy and busy[0][0] <= t:
                _, s = heapq.heappop(busy)
                bisect.insort(avail, s)
            if not avail:
                continue
            idx = bisect.bisect_left(avail, i % k)
            if idx == len(avail):
                idx = 0
            server = avail.pop(idx)
            count[server] += 1
            heapq.heappush(busy, (t + l, server))
        max_c = max(count)
        return [i for i, c in enumerate(count) if c == max_c]

def test():
    sol = Solution()
    assert sol.busiestServers(3, [1,2,3,4,5], [5,2,3,3,3]) == [1]
    assert sol.busiestServers(3, [1,2,3,4], [1,2,1,2]) == [0]
    assert sol.busiestServers(3, [1,2,3], [10,12,11]) == [0,1,2]

    print("✓ find-servers-that-handled-most-number-of-requests passed")

if __name__ == '__main__':
    test()
