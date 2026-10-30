class Fancy:
    def __init__(self):
        self.MOD = 10**9 + 7
        self.vals = []
        self.mul = 1
        self.add = 0

    def append(self, val: int) -> None:
        inv = pow(self.mul, self.MOD - 2, self.MOD)
        normalized = ((val - self.add) % self.MOD * inv) % self.MOD
        self.vals.append(normalized)

    def addAll(self, inc: int) -> None:
        self.add = (self.add + inc) % self.MOD

    def multAll(self, m: int) -> None:
        self.mul = (self.mul * m) % self.MOD
        self.add = (self.add * m) % self.MOD

    def getIndex(self, idx: int) -> int:
        if idx >= len(self.vals):
            return -1
        return (self.vals[idx] * self.mul + self.add) % self.MOD

fancy = Fancy()
fancy.append(2)
fancy.addAll(3)
fancy.append(7)
fancy.multAll(2)
assert fancy.getIndex(0) == 10
fancy.addAll(3)
fancy.append(10)
fancy.multAll(2)
assert fancy.getIndex(0) == 26
assert fancy.getIndex(1) == 34
assert fancy.getIndex(2) == 20
print("All tests passed successfully.")
