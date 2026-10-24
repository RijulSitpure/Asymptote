from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def largestBSTSubtree(self, root: Optional[TreeNode]) -> int:
        max_size = 0

        def dfs(node):
            nonlocal max_size
            if not node:
                return True, 0, float("inf"), float("-inf")
            is_l, cnt_l, min_l, max_l = dfs(node.left)
            is_r, cnt_r, min_r, max_r = dfs(node.right)
            if is_l and is_r and max_l < node.val < min_r:
                curr_size = 1 + cnt_l + cnt_r
                max_size = max(max_size, curr_size)
                return True, curr_size, min(min_l, node.val), max(max_r, node.val)
            return False, max(cnt_l, cnt_r), 0, 0

        dfs(root)
        return max_size

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
    t1 = build_tree([10,5,15,1,8,None,7])
    assert sol.largestBSTSubtree(t1) == 3, "test 1 failed"
    t2 = build_tree([4,2,7,2,3,5,None,2,None,None,None,None,None,1])
    assert sol.largestBSTSubtree(t2) == 2, "test 2 failed"
    assert sol.largestBSTSubtree(None) == 0, "test 3 failed"
    print("✓ largest-bst-subtree passed")

if __name__ == "__main__":
    test()
