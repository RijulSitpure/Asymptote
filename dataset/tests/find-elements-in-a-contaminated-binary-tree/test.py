class TreeNode:
    def __init__(self, val=-1, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class FindElements:
    def __init__(self, root):
        self.seen = set()
        def dfs(node, val):
            if not node:
                return
            self.seen.add(val)
            dfs(node.left, 2 * val + 1)
            dfs(node.right, 2 * val + 2)
        dfs(root, 0)

    def find(self, target: int) -> bool:
        return target in self.seen

root = TreeNode(-1, None, TreeNode(-1))
fe = FindElements(root)
assert fe.find(1) == False
assert fe.find(2) == True
print("All tests passed successfully.")
