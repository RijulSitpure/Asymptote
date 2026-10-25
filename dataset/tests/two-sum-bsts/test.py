from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def twoSumBSTs(self, root1: Optional[TreeNode], root2: Optional[TreeNode], target: int) -> bool:
        vals = set()
        def collect(node):
            if not node:
                return
            vals.add(node.val)
            collect(node.left)
            collect(node.right)
            
        collect(root1)
        
        def check(node):
            if not node:
                return False
            if (target - node.val) in vals:
                return True
            return check(node.left) or check(node.right)
            
        return check(root2)

def test():
    sol = Solution()
    # Tree1: [2,1,4], Tree2: [1,0,3], target: 5 -> True (2+3 or 4+1)
    t1 = TreeNode(2, TreeNode(1), TreeNode(4))
    t2 = TreeNode(1, TreeNode(0), TreeNode(3))
    assert sol.twoSumBSTs(t1, t2, 5) is True, "test 1 failed"
    # Tree1: [0,-10,10], Tree2: [5,1,7,0,2], target: 18 -> False
    t3 = TreeNode(0, TreeNode(-10), TreeNode(10))
    t4 = TreeNode(5, TreeNode(1, TreeNode(0), TreeNode(2)), TreeNode(7))
    assert sol.twoSumBSTs(t3, t4, 18) is False, "test 2 failed"
    print("✓ two-sum-bsts passed")

if __name__ == "__main__":
    test()
