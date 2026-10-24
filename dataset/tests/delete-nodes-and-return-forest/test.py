from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def delNodes(self, root: Optional[TreeNode], to_delete: list[int]) -> list[TreeNode]:
        to_del = set(to_delete)
        res = []
        
        def dfs(node, is_root):
            if not node:
                return None
            deleted = node.val in to_del
            if is_root and not deleted:
                res.append(node)
            node.left = dfs(node.left, deleted)
            node.right = dfs(node.right, deleted)
            return None if deleted else node
        
        dfs(root, True)
        return res

def test():
    sol = Solution()
    # Tree: [1,2,3,4,5,6,7], to_del=[3,5]
    root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3, TreeNode(6), TreeNode(7)))
    forest = sol.delNodes(root, [3, 5])
    roots = sorted([n.val for n in forest])
    assert roots == [1, 6, 7], f"test 1 failed: {roots}"
    print("✓ delete-nodes-and-return-forest passed")

if __name__ == "__main__":
    test()
