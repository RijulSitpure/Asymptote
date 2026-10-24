from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def getMinimumDifference(self, root: Optional[TreeNode]) -> int:
        prev = None
        min_diff = float("inf")

        def inorder(node: Optional[TreeNode]):
            nonlocal prev, min_diff
            if not node:
                return
            inorder(node.left)
            if prev is not None:
                min_diff = min(min_diff, node.val - prev)
            prev = node.val
            inorder(node.right)

        inorder(root)
        return min_diff

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
    t1 = build_tree([4,2,6,1,3])
    assert sol.getMinimumDifference(t1) == 1, "test 1 failed"
    t2 = build_tree([1,0,48,None,None,12,49])
    assert sol.getMinimumDifference(t2) == 1, "test 2 failed"
    print("✓ minimum-absolute-difference-in-bst passed")

if __name__ == "__main__":
    test()
