import random

class Node:
    def __init__(self, val, level):
        self.val = val
        self.forward = [None] * level

class Skiplist:
    def __init__(self):
        self.head = Node(-1, 16)
        self.level = 1

    def search(self, target: int) -> bool:
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < target:
                curr = curr.forward[i]
        curr = curr.forward[0]
        return curr is not None and curr.val == target

    def add(self, num: int) -> None:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr

        lvl = 1
        while random.random() < 0.5 and lvl < 16:
            lvl += 1
        if lvl > self.level:
            for i in range(self.level, lvl):
                update[i] = self.head
            self.level = lvl

        new_node = Node(num, lvl)
        for i in range(lvl):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node

    def erase(self, num: int) -> bool:
        update = [None] * 16
        curr = self.head
        for i in range(self.level - 1, -1, -1):
            while curr.forward[i] and curr.forward[i].val < num:
                curr = curr.forward[i]
            update[i] = curr
        curr = curr.forward[0]
        if not curr or curr.val != num:
            return False
        for i in range(self.level):
            if update[i].forward[i] != curr:
                break
            update[i].forward[i] = curr.forward[i]
        while self.level > 1 and not self.head.forward[self.level - 1]:
            self.level -= 1
        return True

sl = Skiplist()
sl.add(1)
sl.add(2)
sl.add(3)
assert sl.search(0) == False
assert sl.search(1) == True
assert sl.erase(2) == True
assert sl.search(2) == False
assert sl.erase(2) == False
print("All tests passed successfully.")
