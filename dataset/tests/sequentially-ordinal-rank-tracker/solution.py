import bisect

class SORTracker:
    def __init__(self):
        self.locations = []
        self.query_index = 0

    def add(self, name: str, score: int) -> None:
        key = (-score, name)
        bisect.insort(self.locations, key)

    def get(self) -> str:
        name = self.locations[self.query_index][1]
        self.query_index += 1
        return name
