from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def increasingBST(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        dummy = TreeNode(0)
        self.curr = dummy

        def inorder(node: Optional[TreeNode]):
            if not node:
                return
            inorder(node.left)
            node.left = None
            self.curr.right = node
            self.curr = node
            inorder(node.right)

        inorder(root)
        return dummy.right

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

def right_spine_values(root):
    res = []
    curr = root
    while curr:
        assert curr.left is None, "Left child must be null"
        res.append(curr.val)
        curr = curr.right
    return res

def test():
    sol = Solution()
    r1 = build_tree([5, 3, 6, 2, 4, None, 8, 1, None, None, None, 7, 9])
    res1 = sol.increasingBST(r1)
    assert right_spine_values(res1) == [1, 2, 3, 4, 5, 6, 7, 8, 9], f"test 1 failed: {right_spine_values(res1)}"
    print("✓ increasing-order-search-tree passed")

if __name__ == "__main__":
    test()
