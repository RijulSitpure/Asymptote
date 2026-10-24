from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        max_len = 0

        def dfs(node: Optional[TreeNode]):
            nonlocal max_len
            if not node:
                return (0, 0)
            inc = 1
            dec = 1
            if node.left:
                l_inc, l_dec = dfs(node.left)
                if node.val == node.left.val + 1:
                    dec = max(dec, l_dec + 1)
                elif node.val == node.left.val - 1:
                    inc = max(inc, l_inc + 1)
            if node.right:
                r_inc, r_dec = dfs(node.right)
                if node.val == node.right.val + 1:
                    dec = max(dec, r_dec + 1)
                elif node.val == node.right.val - 1:
                    inc = max(inc, r_inc + 1)

            max_len = max(max_len, inc + dec - 1)
            return (inc, dec)

        dfs(root)
        return max_len

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
    t1 = build_tree([1,2,3])
    assert sol.longestConsecutive(t1) == 2, "test 1 failed"
    t2 = build_tree([2,1,3])
    assert sol.longestConsecutive(t2) == 3, "test 2 failed"
    print("✓ binary-tree-longest-consecutive-sequence-ii passed")

if __name__ == "__main__":
    test()
