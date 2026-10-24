import sys

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def inorderSuccessor(self, root: TreeNode, p: TreeNode):
        succ = None
        curr = root
        while curr:
            if curr.val > p.val:
                succ = curr
                curr = curr.left
            else:
                curr = curr.right
        return succ

def test():
    sol = Solution()
    # [2, 1, 3], p = 1 -> 2
    root = TreeNode(2)
    p = TreeNode(1)
    root.left = p
    root.right = TreeNode(3)
    assert sol.inorderSuccessor(root, p).val == 2, "test 1 failed"
    # p = 3 -> None
    assert sol.inorderSuccessor(root, root.right) is None, "test 2 failed"
    print("✓ inorder-successor-in-bst passed")

if __name__ == "__main__":
    test()
