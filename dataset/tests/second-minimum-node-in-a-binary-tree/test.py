from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findSecondMinimumValue(self, root: Optional[TreeNode]) -> int:
        if not root or not root.left:
            return -1

        def dfs(node: Optional[TreeNode]) -> int:
            if not node:
                return -1
            if node.val > root.val:
                return node.val
            left = dfs(node.left)
            right = dfs(node.right)
            if left != -1 and right != -1:
                return min(left, right)
            return max(left, right)

        return dfs(root)

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
    t1 = build_tree([2, 2, 5, None, None, 5, 7])
    assert sol.findSecondMinimumValue(t1) == 5, "test 1 failed"
    t2 = build_tree([2, 2, 2])
    assert sol.findSecondMinimumValue(t2) == -1, "test 2 failed"
    print("✓ second-minimum-node-in-a-binary-tree passed")

if __name__ == "__main__":
    test()
