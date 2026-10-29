class Node:
    def __init__(self, val=0, left=None, right=None, random=None):
        self.val = val
        self.left = left
        self.right = right
        self.random = random

class NodeCopy:
    def __init__(self, val=0, left=None, right=None, random=None):
        self.val = val
        self.left = left
        self.right = right
        self.random = random

class Solution:
    def copyRandomBinaryTree(self, root: Node) -> NodeCopy:
        copies = {}
        def clone(node):
            if not node: return None
            if node in copies: return copies[node]
            cp = NodeCopy(node.val)
            copies[node] = cp
            cp.left = clone(node.left)
            cp.right = clone(node.right)
            cp.random = clone(node.random)
            return cp
        return clone(root)

sol = Solution()
n1 = Node(1)
n2 = Node(4)
n3 = Node(7)
n1.left = n2
n1.right = n3
n2.random = n3
n3.random = n1
res = sol.copyRandomBinaryTree(n1)
assert res.val == 1
assert res.left.val == 4
assert res.right.val == 7
assert res.left.random.val == 7
assert res.right.random.val == 1
print("All tests passed successfully.")
