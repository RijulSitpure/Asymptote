from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def rangeSumBST(self, root: Optional[TreeNode], low: int, high: int) -> int:
        if not root:
            return 0
        if root.val < low:
            return self.rangeSumBST(root.right, low, high)
        if root.val > high:
            return self.rangeSumBST(root.left, low, high)
        return root.val + self.rangeSumBST(root.left, low, high) + self.rangeSumBST(root.right, low, high)

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
    r1 = build_tree([10, 5, 15, 3, 7, None, 18])
    assert sol.rangeSumBST(r1, 7, 15) == 32, "test 1 failed"
    r2 = build_tree([10, 5, 15, 3, 7, 13, 18, 1, None, 6])
    assert sol.rangeSumBST(r2, 6, 10) == 23, "test 2 failed"
    print("✓ range-sum-of-bst passed")

if __name__ == "__main__":
    test()
