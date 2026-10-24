from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestUnivaluePath(self, root: Optional[TreeNode]) -> int:
        ans = 0

        def dfs(node: Optional[TreeNode]) -> int:
            nonlocal ans
            if not node:
                return 0
            left = dfs(node.left)
            right = dfs(node.right)
            left_arrow = left + 1 if node.left and node.left.val == node.val else 0
            right_arrow = right + 1 if node.right and node.right.val == node.val else 0
            ans = max(ans, left_arrow + right_arrow)
            return max(left_arrow, right_arrow)

        dfs(root)
        return ans

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
    t1 = build_tree([5, 4, 5, 1, 1, None, 5])
    assert sol.longestUnivaluePath(t1) == 2, "test 1 failed"
    t2 = build_tree([1, 4, 5, 4, 4, None, 5])
    assert sol.longestUnivaluePath(t2) == 2, "test 2 failed"
    print("✓ longest-univalue-path passed")

if __name__ == "__main__":
    test()
