from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def convertBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        total = 0

        def reverse_inorder(node: Optional[TreeNode]):
            nonlocal total
            if not node:
                return
            reverse_inorder(node.right)
            total += node.val
            node.val = total
            reverse_inorder(node.left)

        reverse_inorder(root)
        return root

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

def tree_to_list(root):
    if not root:
        return []
    res = []
    q = [root]
    while q:
        curr = q.pop(0)
        if curr:
            res.append(curr.val)
            q.append(curr.left)
            q.append(curr.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def test():
    sol = Solution()
    t1 = build_tree([4,1,6,0,2,5,7,None,None,None,3,None,None,None,8])
    res1 = sol.convertBST(t1)
    assert tree_to_list(res1) == [30,36,21,36,35,26,15,None,None,None,33,None,None,None,8], "test 1 failed"
    t2 = build_tree([0,None,1])
    res2 = sol.convertBST(t2)
    assert tree_to_list(res2) == [1,None,1], "test 2 failed"
    print("✓ convert-bst-to-greater-tree passed")

if __name__ == "__main__":
    test()
