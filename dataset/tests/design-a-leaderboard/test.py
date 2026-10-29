import heapq

class Leaderboard:
    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        self.scores[playerId] = self.scores.get(playerId, 0) + score

    def top(self, K: int) -> int:
        heap = []
        for s in self.scores.values():
            heapq.heappush(heap, s)
            if len(heap) > K:
                heapq.heappop(heap)
        return sum(heap)

    def reset(self, playerId: int) -> None:
        if playerId in self.scores:
            del self.scores[playerId]

lb = Leaderboard()
lb.addScore(1, 73)
lb.addScore(2, 56)
lb.addScore(3, 39)
lb.addScore(4, 51)
lb.addScore(5, 4)
assert lb.top(1) == 73
lb.reset(1)
lb.reset(2)
lb.addScore(2, 51)
assert lb.top(3) == 141
print("All tests passed successfully.")
