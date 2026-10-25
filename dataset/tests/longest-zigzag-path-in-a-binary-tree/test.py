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

def inorder(node):
    res = []
    def trav(n):
        if not n: return
        trav(n.left)
        res.append(n.val)
        trav(n.right)
    trav(node)
    return res

class Solution:
    def longestZigZag(self, root) -> int:
        self.max_len = 0
        def dfs(node, go_left, length):
            if not node:
                return
            self.max_len = max(self.max_len, length)
            if go_left:
                dfs(node.left, False, length + 1)
                dfs(node.right, True, 1)
            else:
                dfs(node.right, True, length + 1)
                dfs(node.left, False, 1)
        if root:
            dfs(root.left, False, 1)
            dfs(root.right, True, 1)
        return self.max_len

def test():
    sol = Solution()
    assert sol.longestZigZag(makeTree([1,None,1,1,1,None,None,1,1,None,1,None,None,None,1])) == 3, "test 1 failed"
    assert sol.longestZigZag(makeTree([1,1,1,None,1,None,None,1,1,None,1])) == 4, "test 2 failed"
    assert sol.longestZigZag(makeTree([1])) == 0, "test 3 failed"
    print("✓ longest-zigzag-path-in-a-binary-tree passed")

if __name__ == "__main__":
    test()
