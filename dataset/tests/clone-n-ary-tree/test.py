class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def cloneTree(self, root: Node) -> Node:
        if not root: return None
        cp = Node(root.val)
        cp.children = [self.cloneTree(c) for c in root.children]
        return cp

sol = Solution()
r1 = Node(1, [Node(3, [Node(5), Node(6)]), Node(2), Node(4)])
c1 = sol.cloneTree(r1)
assert c1.val == 1
assert len(c1.children) == 3
assert c1.children[0].val == 3
assert len(c1.children[0].children) == 2
print("All tests passed successfully.")
