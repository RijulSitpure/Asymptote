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
    def sumEvenGrandparent(self, root) -> int:
        def dfs(node, parent, grandparent):
            if not node:
                return 0
            total = node.val if grandparent % 2 == 0 else 0
            total += dfs(node.left, node.val, parent)
            total += dfs(node.right, node.val, parent)
            return total
        return dfs(root, 1, 1)

def test():
    sol = Solution()
    assert sol.sumEvenGrandparent(makeTree([6,7,8,2,7,1,3,9,None,1,4,None,None,None,5])) == 18, "test 1 failed"
    assert sol.sumEvenGrandparent(makeTree([1])) == 0, "test 2 failed"
    print("✓ sum-of-nodes-with-even-valued-grandparent passed")

if __name__ == "__main__":
    test()
