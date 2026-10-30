class Node:
    def __init__(self, val=0, left=None, right=None, parent=None):
        self.val = val
        self.left = left
        self.right = right
        self.parent = parent

class Solution:
    def flipBinaryTree(self, root: 'Node', leaf: 'Node') -> 'Node':
        curr = leaf
        p = curr.parent
        curr.parent = None
        while curr != root:
            if curr.left:
                curr.right = curr.left
            curr.left = p
            gp = p.parent
            if p.left == curr:
                p.left = None
            elif p.right == curr:
                p.right = None
            p.parent = curr
            curr = p
            p = gp
        return leaf

r = Node(3)
l = Node(5)
r.left = l
l.parent = r
sol = Solution()
new_root = sol.flipBinaryTree(r, l)
assert new_root == l
assert l.left == r
assert r.parent == l
print("All tests passed successfully.")
