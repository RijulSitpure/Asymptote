import heapq

class Matrix3D:
    def __init__(self, n: int):
        self.n = n
        self.ones = set()
        self.count = [0] * n
        self.heap = [(0, -x) for x in range(n)]
        heapq.heapify(self.heap)

    def setCell(self, x: int, y: int, z: int) -> None:
        if (x, y, z) not in self.ones:
            self.ones.add((x, y, z))
            self.count[x] += 1
            heapq.heappush(self.heap, (-self.count[x], -x))

    def unsetCell(self, x: int, y: int, z: int) -> None:
        if (x, y, z) in self.ones:
            self.ones.remove((x, y, z))
            self.count[x] -= 1
            heapq.heappush(self.heap, (-self.count[x], -x))

    def largestMatrix(self) -> int:
        while self.heap:
            neg_c, neg_x = self.heap[0]
            if -neg_c == self.count[-neg_x]:
                return -neg_x
            heapq.heappop(self.heap)
        return 0
