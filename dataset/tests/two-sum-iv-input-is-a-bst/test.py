from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        seen = set()

        def dfs(node: Optional[TreeNode]) -> bool:
            if not node:
                return False
            if k - node.val in seen:
                return True
            seen.add(node.val)
            return dfs(node.left) or dfs(node.right)

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
    t1 = build_tree([5, 3, 6, 2, 4, None, 7])
    assert sol.findTarget(t1, 9) is True, "test 1 failed"
    assert sol.findTarget(t1, 28) is False, "test 2 failed"
    print("✓ two-sum-iv-input-is-a-bst passed")

if __name__ == "__main__":
    test()
