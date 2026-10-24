import sys
from typing import List, Optional
from collections import defaultdict, deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        if not root:
            return []
        col_map = defaultdict(list)
        q = deque([(root, 0)])
        min_col = max_col = 0
        while q:
            node, col = q.popleft()
            col_map[col].append(node.val)
            min_col = min(min_col, col)
            max_col = max(max_col, col)
            if node.left:
                q.append((node.left, col - 1))
            if node.right:
                q.append((node.right, col + 1))
        return [col_map[c] for c in range(min_col, max_col + 1)]

def test():
    sol = Solution()
    # [3,9,20,null,null,15,7] -> [[9],[3,15],[20],[7]]
    root = TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7)))
    assert sol.verticalOrder(root) == [[9],[3,15],[20],[7]], "test 1 failed"
    assert sol.verticalOrder(None) == [], "test 2 failed"
    print("✓ binary-tree-vertical-order-traversal passed")

if __name__ == "__main__":
    test()
