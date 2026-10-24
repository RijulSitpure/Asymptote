import sys
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flatten(self, root: Optional[TreeNode]) -> None:
        curr = root
        while curr:
            if curr.left:
                pred = curr.left
                while pred.right:
                    pred = pred.right
                pred.right = curr.right
                curr.right = curr.left
                curr.left = None
            curr = curr.right

def to_arr(root):
    res = []
    curr = root
    while curr:
        res.append(curr.val)
        assert curr.left is None, "left must be null"
        curr = curr.right
    return res

def test():
    sol = Solution()
    # [1,2,5,3,4,null,6]
    root = TreeNode(1)
    root.left = TreeNode(2, TreeNode(3), TreeNode(4))
    root.right = TreeNode(5, None, TreeNode(6))
    sol.flatten(root)
    assert to_arr(root) == [1, 2, 3, 4, 5, 6], "test 1 failed"
    print("✓ flatten-binary-tree-to-linked-list passed")

if __name__ == "__main__":
    test()
