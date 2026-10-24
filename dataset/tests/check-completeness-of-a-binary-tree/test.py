from collections import deque
from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def isCompleteTree(self, root: Optional[TreeNode]) -> bool:
        q = deque([root])
        seen_none = False
        while q:
            node = q.popleft()
            if not node:
                seen_none = True
            else:
                if seen_none:
                    return False
                q.append(node.left)
                q.append(node.right)
        return True

def build_tree(lst):
    if not lst:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in lst]
    q = [nodes[0]]
    i = 1
    while q and i < len(nodes):
        curr = q.pop(0)
        if curr:
            if i < len(nodes):
                curr.left = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
            if i < len(nodes):
                curr.right = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
    return nodes[0]

def test():
    sol = Solution()
    r1 = build_tree([1, 2, 3, 4, 5, 6])
    assert sol.isCompleteTree(r1) is True, "test 1 failed"
    r2 = build_tree([1, 2, 3, 4, 5, None, 7])
    assert sol.isCompleteTree(r2) is False, "test 2 failed"
    print("✓ check-completeness-of-a-binary-tree passed")

if __name__ == "__main__":
    test()
