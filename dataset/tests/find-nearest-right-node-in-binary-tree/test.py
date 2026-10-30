class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

from collections import deque

class Solution:
    def findNearestRightNode(self, root: TreeNode, u: TreeNode) -> TreeNode:
        q = deque([root])
        while q:
            sz = len(q)
            for i in range(sz):
                node = q.popleft()
                if node == u:
                    return q.popleft() if i < sz - 1 else None
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
        return None

sol = Solution()
n4 = TreeNode(4)
n5 = TreeNode(5)
n2 = TreeNode(2, n4, n5)
n6 = TreeNode(6)
n3 = TreeNode(3, None, n6)
root = TreeNode(1, n2, n3)
assert sol.findNearestRightNode(root, n4) == n5
assert sol.findNearestRightNode(root, n5) == n6
assert sol.findNearestRightNode(root, n6) is None
print("All tests passed successfully.")
