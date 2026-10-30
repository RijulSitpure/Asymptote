class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None
        self.parent = None

class Solution:
    def lowestCommonAncestor(self, p: 'Node', q: 'Node') -> 'Node':
        p1, p2 = p, q
        while p1 != p2:
            p1 = p1.parent if p1 else q
            p2 = p2.parent if p2 else p
        return p1

root = Node(3)
p = Node(5)
q = Node(1)
p.parent = root
q.parent = root
root.left = p
root.right = q

sol = Solution()
assert sol.lowestCommonAncestor(p, q) == root
print("All tests passed successfully.")
