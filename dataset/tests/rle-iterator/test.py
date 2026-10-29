import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'rle-iterator.json')

class RLEIterator:
    def __init__(self, encoding: list[int]):
        self.encoding = encoding
        self.idx = 0

    def next(self, n: int) -> int:
        while self.idx < len(self.encoding):
            if self.encoding[self.idx] >= n:
                self.encoding[self.idx] -= n
                return self.encoding[self.idx + 1]
            n -= self.encoding[self.idx]
            self.idx += 2
        return -1

rle = RLEIterator([3, 8, 0, 9, 2, 5])
assert rle.next(2) == 8
assert rle.next(1) == 8
assert rle.next(1) == 5
assert rle.next(2) == -1
print("✓ rle-iterator passed")
