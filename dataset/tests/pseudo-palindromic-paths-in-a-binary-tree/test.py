from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def makeTree(arr):
    if not arr or arr[0] is None:
        return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        curr = q.popleft()
        if i < len(arr) and arr[i] is not None:
            curr.left = TreeNode(arr[i])
            q.append(curr.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            curr.right = TreeNode(arr[i])
            q.append(curr.right)
        i += 1
    return root

class Solution:
    def pseudoPalindromicPaths(self, root) -> int:
        def dfs(node, mask):
            if not node:
                return 0
            mask ^= (1 << node.val)
            if not node.left and not node.right:
                return 1 if (mask & (mask - 1)) == 0 else 0
            return dfs(node.left, mask) + dfs(node.right, mask)
        return dfs(root, 0)

def test():
    sol = Solution()
    assert sol.pseudoPalindromicPaths(makeTree([2,3,1,3,1,None,1])) == 2, "test 1 failed"
    assert sol.pseudoPalindromicPaths(makeTree([2,1,1,1,3,None,None,None,None,None,1])) == 1, "test 2 failed"
    assert sol.pseudoPalindromicPaths(makeTree([9])) == 1, "test 3 failed"
    print("✓ pseudo-palindromic-paths-in-a-binary-tree passed")

if __name__ == "__main__":
    test()
