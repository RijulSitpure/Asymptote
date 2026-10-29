import bisect

class SnapshotArray:
    def __init__(self, length: int):
        self.snaps = [[(0, 0)] for _ in range(length)]
        self.snap_id = 0

    def set(self, index: int, val: int) -> None:
        history = self.snaps[index]
        if history[-1][0] == self.snap_id:
            history[-1] = (self.snap_id, val)
        else:
            history.append((self.snap_id, val))

    def snap(self) -> int:
        self.snap_id += 1
        return self.snap_id - 1

    def get(self, index: int, snap_id: int) -> int:
        history = self.snaps[index]
        idx = bisect.bisect_right(history, (snap_id, float("inf"))) - 1
        return history[idx][1]

sa = SnapshotArray(3)
sa.set(0, 5)
s0 = sa.snap()
sa.set(0, 6)
assert sa.get(0, 0) == 5
assert sa.get(0, s0) == 5
print("All tests passed successfully.")
