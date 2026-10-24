from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def boundaryOfBinaryTree(self, root: Optional[TreeNode]) -> List[int]:
        if not root:
            return []

        def is_leaf(node):
            return node and not node.left and not node.right

        res = []
        if not is_leaf(root):
            res.append(root.val)

        curr = root.left
        while curr:
            if not is_leaf(curr):
                res.append(curr.val)
            curr = curr.left if curr.left else curr.right

        def add_leaves(node):
            if not node:
                return
            if is_leaf(node):
                res.append(node.val)
                return
            add_leaves(node.left)
            add_leaves(node.right)

        add_leaves(root)

        right_boundary = []
        curr = root.right
        while curr:
            if not is_leaf(curr):
                right_boundary.append(curr.val)
            curr = curr.right if curr.right else curr.left

        res.extend(reversed(right_boundary))
        return res

def build_tree(lst):
    if not lst:
        return None
    root = TreeNode(lst[0])
    q = [root]
    i = 1
    while q and i < len(lst):
        node = q.pop(0)
        if i < len(lst) and lst[i] is not None:
            node.left = TreeNode(lst[i])
            q.append(node.left)
        i += 1
        if i < len(lst) and lst[i] is not None:
            node.right = TreeNode(lst[i])
            q.append(node.right)
        i += 1
    return root

def test():
    sol = Solution()
    t1 = build_tree([1,None,2,3,4])
    assert sol.boundaryOfBinaryTree(t1) == [1,3,4,2], "test 1 failed"
    t2 = build_tree([1,2,3,4,5,6,None,None,None,7,8,9,10])
    assert sol.boundaryOfBinaryTree(t2) == [1,2,4,7,8,9,10,6,3], "test 2 failed"
    print("✓ boundary-of-binary-tree passed")

if __name__ == "__main__":
    test()
