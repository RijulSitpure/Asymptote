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
    def balanceBST(self, root):
        vals = []
        def inorder(node):
            if not node:
                return
            inorder(node.left)
            vals.append(node.val)
            inorder(node.right)
        inorder(root)
        def build(left, right):
            if left > right:
                return None
            mid = (left + right) // 2
            node = TreeNode(vals[mid])
            node.left = build(left, mid - 1)
            node.right = build(mid + 1, right)
            return node
        return build(0, len(vals) - 1)

def test():
    sol = Solution()
    assert inorder(sol.balanceBST(makeTree([1,None,2,None,3,None,4,None,None]))) == [1,2,3,4], "test 1 failed"
    assert inorder(sol.balanceBST(makeTree([2,1,3]))) == [1,2,3], "test 2 failed"
    print("✓ balance-a-binary-search-tree passed")

if __name__ == "__main__":
    test()
