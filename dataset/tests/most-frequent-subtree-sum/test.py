from collections import defaultdict
from typing import List, Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def findFrequentTreeSum(self, root: Optional[TreeNode]) -> List[int]:
        counts = defaultdict(int)

        def dfs(node: Optional[TreeNode]) -> int:
            if not node:
                return 0
            total = node.val + dfs(node.left) + dfs(node.right)
            counts[total] += 1
            return total

        dfs(root)
        max_freq = max(counts.values())
        return [s for s, c in counts.items() if c == max_freq]

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
    t1 = build_tree([5,2,-3])
    assert sorted(sol.findFrequentTreeSum(t1)) == [-3, 2, 4], "test 1 failed"
    t2 = build_tree([5,2,-5])
    assert sol.findFrequentTreeSum(t2) == [2], "test 2 failed"
    print("✓ most-frequent-subtree-sum passed")

if __name__ == "__main__":
    test()
