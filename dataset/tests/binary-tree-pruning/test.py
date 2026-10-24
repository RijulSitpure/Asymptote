from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def pruneTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        if not root:
            return None
        root.left = self.pruneTree(root.left)
        root.right = self.pruneTree(root.right)
        if not root.left and not root.right and root.val == 0:
            return None
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
        node = q.pop(0)
        if node:
            res.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

def test():
    sol = Solution()
    t1 = build_tree([1, None, 0, 0, 1])
    res1 = sol.pruneTree(t1)
    assert tree_to_list(res1) == [1, None, 0, None, 1], f"test 1 failed: {tree_to_list(res1)}"
    t2 = build_tree([1, 0, 1, 0, 0, 0, 1])
    res2 = sol.pruneTree(t2)
    assert tree_to_list(res2) == [1, None, 1, None, 1], f"test 2 failed: {tree_to_list(res2)}"
    print("✓ binary-tree-pruning passed")

if __name__ == "__main__":
    test()
