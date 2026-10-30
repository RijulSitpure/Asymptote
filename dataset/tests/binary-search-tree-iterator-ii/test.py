class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class BSTIterator:
    def __init__(self, root: TreeNode):
        self.stack = []
        self.history = []
        self.idx = -1
        self._push_left(root)

    def _push_left(self, node):
        while node:
            self.stack.append(node)
            node = node.left

    def hasNext(self) -> bool:
        return self.idx + 1 < len(self.history) or len(self.stack) > 0

    def next(self) -> int:
        self.idx += 1
        if self.idx < len(self.history):
            return self.history[self.idx]
        node = self.stack.pop()
        self._push_left(node.right)
        self.history.append(node.val)
        return node.val

    def hasPrev(self) -> bool:
        return self.idx > 0

    def prev(self) -> int:
        self.idx -= 1
        return self.history[self.idx]

r = TreeNode(7, TreeNode(3), TreeNode(15, TreeNode(9), TreeNode(20)))
it = BSTIterator(r)
assert it.next() == 3
assert it.next() == 7
assert it.prev() == 3
assert it.next() == 7
assert it.hasNext() == True
assert it.next() == 9
assert it.next() == 15
assert it.next() == 20
assert it.hasNext() == False
assert it.hasPrev() == True
assert it.prev() == 15
print("All tests passed successfully.")
