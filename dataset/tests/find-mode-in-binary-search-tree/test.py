from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findMode(self, root: Optional[TreeNode]) -> List[int]:
        curr_val = None
        curr_count = 0
        max_count = 0
        modes = []

        def inorder(node: Optional[TreeNode]):
            nonlocal curr_val, curr_count, max_count, modes
            if not node:
                return
            inorder(node.left)
            if node.val == curr_val:
                curr_count += 1
            else:
                curr_val = node.val
                curr_count = 1
            if curr_count > max_count:
                max_count = curr_count
                modes = [curr_val]
            elif curr_count == max_count:
                modes.append(curr_val)
            inorder(node.right)

        inorder(root)
        return modes

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
    t1 = build_tree([1,None,2,2])
    assert sol.findMode(t1) == [2], "test 1 failed"
    t2 = build_tree([0])
    assert sol.findMode(t2) == [0], "test 2 failed"
    print("✓ find-mode-in-binary-search-tree passed")

if __name__ == "__main__":
    test()
