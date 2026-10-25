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

def treeToArray(root):
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        node = q.popleft()
        if node:
            res.append(node.val)
            q.append(node.left)
            q.append(node.right)
        else:
            res.append(None)
    while res and res[-1] is None:
        res.pop()
    return res

class Solution:
    def removeLeafNodes(self, root, target: int):
        if not root:
            return None
        root.left = self.removeLeafNodes(root.left, target)
        root.right = self.removeLeafNodes(root.right, target)
        if not root.left and not root.right and root.val == target:
            return None
        return root

def test():
    sol = Solution()
    assert treeToArray(sol.removeLeafNodes(makeTree([1,2,3,2,None,2,4]), 2)) == [1,None,3,None,4], "test 1 failed"
    assert treeToArray(sol.removeLeafNodes(makeTree([1,3,3,3,2]), 3)) == [1,3,None,None,2], "test 2 failed"
    print("✓ delete-leaves-with-a-given-value passed")

if __name__ == "__main__":
    test()
