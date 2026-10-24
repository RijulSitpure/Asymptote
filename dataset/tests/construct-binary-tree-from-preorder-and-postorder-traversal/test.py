from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def constructFromPrePost(self, preorder: List[int], postorder: List[int]) -> Optional[TreeNode]:
        if not preorder:
            return None
        root = TreeNode(preorder[0])
        if len(preorder) == 1:
            return root
        left_root_val = preorder[1]
        left_size = postorder.index(left_root_val) + 1
        root.left = self.constructFromPrePost(preorder[1:1 + left_size], postorder[:left_size])
        root.right = self.constructFromPrePost(preorder[1 + left_size:], postorder[left_size:-1])
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
    t1 = sol.constructFromPrePost([1, 2, 4, 5, 3, 6, 7], [4, 5, 2, 6, 7, 3, 1])
    assert tree_to_list(t1) == [1, 2, 3, 4, 5, 6, 7], f"test 1 failed: {tree_to_list(t1)}"
    t2 = sol.constructFromPrePost([1], [1])
    assert tree_to_list(t2) == [1], f"test 2 failed: {tree_to_list(t2)}"
    print("✓ construct-binary-tree-from-preorder-and-postorder-traversal passed")

if __name__ == "__main__":
    test()
