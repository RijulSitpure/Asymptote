from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rob(self, root: Optional[TreeNode]) -> int:
        def dfs(node):
            if not node:
                return (0, 0)
            left_rob, left_skip = dfs(node.left)
            right_rob, right_skip = dfs(node.right)
            rob_curr = node.val + left_skip + right_skip
            skip_curr = max(left_rob, left_skip) + max(right_rob, right_skip)
            return (rob_curr, skip_curr)

        return max(dfs(root))

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
    t1 = build_tree([3,2,3,None,3,None,1])
    assert sol.rob(t1) == 7, "test 1 failed"
    t2 = build_tree([3,4,5,1,3,None,1])
    assert sol.rob(t2) == 9, "test 2 failed"
    print("✓ house-robber-iii passed")

if __name__ == "__main__":
    test()
