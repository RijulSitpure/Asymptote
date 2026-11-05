class EventManager:
    def __init__(self):
        self.events = {}

    def subscribe(self, event: str, listenerId: int) -> None:
        if event not in self.events:
            self.events[event] = set()
        self.events[event].add(listenerId)

    def unsubscribe(self, event: str, listenerId: int) -> None:
        if event in self.events:
            self.events[event].discard(listenerId)

    def emit(self, event: str) -> list[int]:
        if event not in self.events:
            return []
        return sorted(list(self.events[event]))