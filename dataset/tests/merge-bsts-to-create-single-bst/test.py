class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def canMerge(self, trees: list[TreeNode]) -> TreeNode | None:
        root_map = {t.val: t for t in trees}
        leaves = set()
        for t in trees:
            if t.left:
                leaves.add(t.left.val)
            if t.right:
                leaves.add(t.right.val)
                
        root_candidates = [t for t in trees if t.val not in leaves]
        if len(root_candidates) != 1:
            return None
            
        root = root_candidates[0]
        del root_map[root.val]
        
        def validate(node, low, high):
            if not node:
                return True
            if not (low < node.val < high):
                return False
            if not node.left and not node.right and node.val in root_map:
                sub = root_map.pop(node.val)
                node.left = sub.left
                node.right = sub.right
            return validate(node.left, low, node.val) and validate(node.right, node.val, high)
            
        if validate(root, float("-inf"), float("inf")) and not root_map:
            return root
        return None

def test_can_merge():
    sol = Solution()
    t1 = TreeNode(2, TreeNode(1), None)
    t2 = TreeNode(3, TreeNode(2), TreeNode(5))
    t3 = TreeNode(5, TreeNode(4), None)
    merged = sol.canMerge([t1, t2, t3])
    assert merged is not None
    assert merged.val == 3

