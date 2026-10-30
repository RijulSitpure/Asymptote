class Bitset:
    def __init__(self, size: int):
        self.size = size
        self.bits = [0] * size
        self.flipped = False
        self.ones = 0

    def fix(self, idx: int) -> None:
        val = self.bits[idx] ^ (1 if self.flipped else 0)
        if val == 0:
            self.bits[idx] = 0 if self.flipped else 1
            self.ones += 1

    def unfix(self, idx: int) -> None:
        val = self.bits[idx] ^ (1 if self.flipped else 0)
        if val == 1:
            self.bits[idx] = 1 if self.flipped else 0
            self.ones -= 1

    def flip(self) -> None:
        self.flipped = not self.flipped
        self.ones = self.size - self.ones

    def all(self) -> bool:
        return self.ones == self.size

    def one(self) -> bool:
        return self.ones > 0

    def count(self) -> int:
        return self.ones

    def toString(self) -> str:
        if not self.flipped:
            return "".join(str(b) for b in self.bits)
        return "".join('1' if b == 0 else '0' for b in self.bits)
