class ProductOfNumbers:
    def __init__(self):
        self.prefix = [1]

    def add(self, num: int) -> None:
        if num == 0:
            self.prefix = [1]
        else:
            self.prefix.append(self.prefix[-1] * num)

    def getProduct(self, k: int) -> int:
        if k >= len(self.prefix):
            return 0
        return self.prefix[-1] // self.prefix[-1 - k]

p = ProductOfNumbers()
p.add(3)
p.add(0)
p.add(2)
p.add(5)
p.add(4)
assert p.getProduct(2) == 20
assert p.getProduct(3) == 40
assert p.getProduct(4) == 0
p.add(8)
assert p.getProduct(2) == 32
print("All tests passed successfully.")
