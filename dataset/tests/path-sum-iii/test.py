from collections import defaultdict
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def pathSum(self, root: Optional[TreeNode], targetSum: int) -> int:
        prefix_counts = defaultdict(int)
        prefix_counts[0] = 1
        count = 0

        def dfs(node: Optional[TreeNode], curr_sum: int):
            nonlocal count
            if not node:
                return
            curr_sum += node.val
            count += prefix_counts[curr_sum - targetSum]
            prefix_counts[curr_sum] += 1
            dfs(node.left, curr_sum)
            dfs(node.right, curr_sum)
            prefix_counts[curr_sum] -= 1

        dfs(root, 0)
        return count

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
    t1 = build_tree([10,5,-3,3,2,None,11,3,-2,None,1])
    assert sol.pathSum(t1, 8) == 3, "test 1 failed"
    t2 = build_tree([5,4,8,11,None,13,4,7,2,None,None,5,1])
    assert sol.pathSum(t2, 22) == 3, "test 2 failed"
    print("✓ path-sum-iii passed")

if __name__ == "__main__":
    test()
