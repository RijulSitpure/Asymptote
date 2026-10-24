from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def flipEquiv(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        if not root1 or not root2:
            return root1 == root2
        if root1.val != root2.val:
            return False
        no_flip = self.flipEquiv(root1.left, root2.left) and self.flipEquiv(root1.right, root2.right)
        flip = self.flipEquiv(root1.left, root2.right) and self.flipEquiv(root1.right, root2.left)
        return no_flip or flip

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
    r1 = build_tree([1,2,3,4,5,6,None,None,None,7,8])
    r2 = build_tree([1,3,2,None,6,4,5,None,None,None,None,8,7])
    assert sol.flipEquiv(r1, r2) is True, "test 1 failed"
    r3 = build_tree([])
    r4 = build_tree([])
    assert sol.flipEquiv(r3, r4) is True, "test 2 failed"
    r5 = build_tree([])
    r6 = build_tree([1])
    assert sol.flipEquiv(r5, r6) is False, "test 3 failed"
    print("✓ flip-equivalent-binary-trees passed")

if __name__ == "__main__":
    test()
