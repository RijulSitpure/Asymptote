from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def addOneRow(self, root: Optional[TreeNode], val: int, depth: int) -> Optional[TreeNode]:
        if depth == 1:
            return TreeNode(val, root, None)

        def dfs(node: Optional[TreeNode], curr_depth: int):
            if not node:
                return
            if curr_depth == depth - 1:
                node.left = TreeNode(val, node.left, None)
                node.right = TreeNode(val, None, node.right)
                return
            dfs(node.left, curr_depth + 1)
            dfs(node.right, curr_depth + 1)

        dfs(root, 1)
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
    t1 = build_tree([4,2,6,3,1,5])
    res1 = sol.addOneRow(t1, 1, 2)
    assert tree_to_list(res1) == [4,1,1,2,None,None,6,3,1,5], "test 1 failed"
    t2 = build_tree([4,2,None,3,1])
    res2 = sol.addOneRow(t2, 1, 3)
    assert tree_to_list(res2) == [4,2,None,1,1,3,None,None,1], "test 2 failed"
    print("✓ add-one-row-to-tree passed")

if __name__ == "__main__":
    test()
