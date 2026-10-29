import sys, os
base = os.path.dirname(os.path.abspath(__file__))
sol_file = os.path.join(base, '..', '..', 'problems', 'online-stock-span.json')

class StockSpanner:
    def __init__(self):
        self.stack = []

    def next(self, price: int) -> int:
        span = 1
        while self.stack and self.stack[-1][0] <= price:
            span += self.stack.pop()[1]
        self.stack.append((price, span))
        return span

sp = StockSpanner()
assert sp.next(100) == 1
assert sp.next(80) == 1
assert sp.next(60) == 1
assert sp.next(70) == 2
assert sp.next(60) == 1
assert sp.next(75) == 4
assert sp.next(85) == 6
print("✓ online-stock-span passed")
