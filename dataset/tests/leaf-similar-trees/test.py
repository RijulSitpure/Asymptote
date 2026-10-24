from typing import Optional, List

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def leafSimilar(self, root1: Optional[TreeNode], root2: Optional[TreeNode]) -> bool:
        def get_leaves(node: Optional[TreeNode]) -> List[int]:
            if not node:
                return []
            if not node.left and not node.right:
                return [node.val]
            return get_leaves(node.left) + get_leaves(node.right)

        return get_leaves(root1) == get_leaves(root2)

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
    r1 = build_tree([3, 5, 1, 6, 2, 9, 8, None, None, 7, 4])
    r2 = build_tree([3, 5, 1, 6, 7, 4, 2, None, None, None, None, None, None, 9, 8])
    assert sol.leafSimilar(r1, r2) is True, "test 1 failed"
    r3 = build_tree([1, 2, 3])
    r4 = build_tree([1, 3, 2])
    assert sol.leafSimilar(r3, r4) is False, "test 2 failed"
    print("✓ leaf-similar-trees passed")

if __name__ == "__main__":
    test()
