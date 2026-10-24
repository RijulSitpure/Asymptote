from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def checkEqualTree(self, root: Optional[TreeNode]) -> bool:
        seen_sums = []

        def get_sum(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            s = node.val + get_sum(node.left) + get_sum(node.right)
            seen_sums.append(s)
            return s

        total = get_sum(root)
        seen_sums.pop()
        if total % 2 != 0:
            return False
        return (total // 2) in seen_sums

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
    t1 = build_tree([5, 10, 10, None, None, 2, 3])
    assert sol.checkEqualTree(t1) is True, "test 1 failed"
    t2 = build_tree([1, 2, 10, None, None, 2, 20])
    assert sol.checkEqualTree(t2) is False, "test 2 failed"
    print("✓ equal-tree-partition passed")

if __name__ == "__main__":
    test()
