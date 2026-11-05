from collections import deque, defaultdict
import bisect

class Router:
    def __init__(self, memoryLimit: int):
        self.limit = memoryLimit
        self.q = deque()
        self.seen = set()
        self.dest_times = defaultdict(list)

    def addPacket(self, source: int, destination: int, timestamp: int) -> bool:
        pkt = (source, destination, timestamp)
        if pkt in self.seen:
            return False
        if len(self.q) >= self.limit:
            old_src, old_dst, old_ts = self.q.popleft()
            self.seen.remove((old_src, old_dst, old_ts))
            lst = self.dest_times[old_dst]
            idx = bisect.bisect_left(lst, old_ts)
            if idx < len(lst) and lst[idx] == old_ts:
                lst.pop(idx)
        self.q.append(pkt)
        self.seen.add(pkt)
        bisect.insort(self.dest_times[destination], timestamp)
        return True

    def forwardPacket(self) -> list[int]:
        if not self.q:
            return []
        src, dst, ts = self.q.popleft()
        self.seen.remove((src, dst, ts))
        lst = self.dest_times[dst]
        idx = bisect.bisect_left(lst, ts)
        if idx < len(lst) and lst[idx] == ts:
            lst.pop(idx)
        return [src, dst, ts]

    def getCount(self, destination: int, startTime: int, endTime: int) -> int:
        lst = self.dest_times[destination]
        if not lst:
            return 0
        l = bisect.bisect_left(lst, startTime)
        r = bisect.bisect_right(lst, endTime)
        return r - l

def run_tests():
    r = Router(3)
    assert r.addPacket(1, 2, 10) == True
    assert r.addPacket(1, 2, 10) == False
    assert r.addPacket(2, 2, 20) == True
    assert r.addPacket(3, 2, 30) == True
    assert r.getCount(2, 10, 25) == 2
    assert r.forwardPacket() == [1, 2, 10]
    assert r.getCount(2, 10, 25) == 1
    print("All tests passed for implement-router")

if __name__ == '__main__':
    run_tests()
