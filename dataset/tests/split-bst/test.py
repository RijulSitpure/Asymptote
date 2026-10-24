from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def splitBST(self, root: Optional[TreeNode], target: int) -> List[Optional[TreeNode]]:
        if not root:
            return [None, None]
        if root.val <= target:
            left, right = self.splitBST(root.right, target)
            root.right = left
            return [root, right]
        else:
            left, right = self.splitBST(root.left, target)
            root.left = right
            return [left, root]

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
    t = build_tree([4, 2, 6, 1, 3, 5, 7])
    res = sol.splitBST(t, 2)
    assert tree_to_list(res[0]) == [2, 1], f"test 1 res[0] failed: {tree_to_list(res[0])}"
    assert tree_to_list(res[1]) == [4, 3, 6, None, None, 5, 7], f"test 1 res[1] failed: {tree_to_list(res[1])}"
    print("✓ split-bst passed")

if __name__ == "__main__":
    test()
