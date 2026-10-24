import sys
from collections import deque
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def closestKValues(self, root: Optional[TreeNode], target: float, k: int) -> List[int]:
        q = deque()

        def inorder(node: Optional[TreeNode]):
            if not node:
                return
            inorder(node.left)
            if len(q) < k:
                q.append(node.val)
            elif abs(node.val - target) < abs(q[0] - target):
                q.popleft()
                q.append(node.val)
            else:
                return
            inorder(node.right)

        inorder(root)
        return list(q)

def test():
    sol = Solution()
    # [4,2,5,1,3], target = 3.714286, k = 2 -> [4, 3] or [3, 4]
    root = TreeNode(4, TreeNode(2, TreeNode(1), TreeNode(3)), TreeNode(5))
    r1 = sol.closestKValues(root, 3.714286, 2)
    assert sorted(r1) == [3, 4], "test 1 failed"
    # [1], target = 0.0, k = 1 -> [1]
    assert sol.closestKValues(TreeNode(1), 0.0, 1) == [1], "test 2 failed"
    print("✓ closest-binary-search-tree-value-ii passed")

if __name__ == "__main__":
    test()
