from collections import deque

class FrontMiddleBackQueue:
    def __init__(self):
        self.left = deque()
        self.right = deque()

    def _balance(self):
        if len(self.left) > len(self.right):
            self.right.appendleft(self.left.pop())
        elif len(self.right) > len(self.left) + 1:
            self.left.append(self.right.popleft())

    def pushFront(self, val: int) -> None:
        self.left.appendleft(val)
        self._balance()

    def pushMiddle(self, val: int) -> None:
        if len(self.left) == len(self.right):
            self.right.appendleft(val)
        else:
            self.left.append(val)
        self._balance()

    def pushBack(self, val: int) -> None:
        self.right.append(val)
        self._balance()

    def popFront(self) -> int:
        if not self.left and not self.right:
            return -1
        ans = self.left.popleft() if self.left else self.right.popleft()
        self._balance()
        return ans

    def popMiddle(self) -> int:
        if not self.left and not self.right:
            return -1
        if len(self.left) == len(self.right):
            ans = self.left.pop()
        else:
            ans = self.right.popleft()
        self._balance()
        return ans

    def popBack(self) -> int:
        if not self.left and not self.right:
            return -1
        ans = self.right.pop()
        self._balance()
        return ans

q = FrontMiddleBackQueue()
q.pushFront(1)
q.pushBack(2)
q.pushMiddle(3)
q.pushMiddle(4)
assert q.popFront() == 1
assert q.popMiddle() == 3
assert q.popMiddle() == 4
assert q.popBack() == 2
assert q.popFront() == -1
print("All tests passed successfully.")
