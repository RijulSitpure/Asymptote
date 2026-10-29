class CustomStack:
    def __init__(self, maxSize: int):
        self.max_size = maxSize
        self.stack = []
        self.inc = []

    def push(self, x: int) -> None:
        if len(self.stack) < self.max_size:
            self.stack.append(x)
            self.inc.append(0)

    def pop(self) -> int:
        if not self.stack:
            return -1
        idx = len(self.stack) - 1
        diff = self.inc.pop()
        if idx > 0:
            self.inc[-1] += diff
        return self.stack.pop() + diff

    def increment(self, k: int, val: int) -> None:
        idx = min(k, len(self.stack)) - 1
        if idx >= 0:
            self.inc[idx] += val

stk = CustomStack(3)
stk.push(1)
stk.push(2)
assert stk.pop() == 2
stk.push(2)
stk.push(3)
stk.push(4)
stk.increment(5, 100)
stk.increment(2, 100)
assert stk.pop() == 103
assert stk.pop() == 202
assert stk.pop() == 201
assert stk.pop() == -1
print("All tests passed successfully.")
