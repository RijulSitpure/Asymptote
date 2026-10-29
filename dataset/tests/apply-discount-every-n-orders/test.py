class Cashier:
    def __init__(self, n: int, discount: int, products: list[int], prices: list[int]):
        self.n = n
        self.discount = discount
        self.count = 0
        self.price_map = {p: pr for p, pr in zip(products, prices)}

    def getBill(self, product: list[int], amount: list[int]) -> float:
        self.count += 1
        total = sum(self.price_map[p] * a for p, a in zip(product, amount))
        if self.count % self.n == 0:
            total -= (self.discount * total) / 100.0
        return total

c = Cashier(3, 50, [1, 2, 3, 4, 5, 6, 7], [100, 200, 300, 400, 300, 200, 100])
assert c.getBill([1, 2], [1, 2]) == 500.0
assert c.getBill([3, 7], [10, 10]) == 4000.0
assert abs(c.getBill([1, 2, 3, 4, 5, 6, 7], [1, 1, 1, 1, 1, 1, 1]) - 800.0) < 1e-5
print("All tests passed successfully.")
