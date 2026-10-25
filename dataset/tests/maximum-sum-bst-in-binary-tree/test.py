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
    def maxSumBST(self, root) -> int:
        self.max_sum = 0
        def dfs(node):
            if not node:
                return True, float("inf"), float("-inf"), 0
            l_valid, l_min, l_max, l_sum = dfs(node.left)
            r_valid, r_min, r_max, r_sum = dfs(node.right)
            if l_valid and r_valid and l_max < node.val < r_min:
                total = l_sum + r_sum + node.val
                self.max_sum = max(self.max_sum, total)
                return True, min(l_min, node.val), max(r_max, node.val), total
            return False, 0, 0, 0
        dfs(root)
        return self.max_sum

def test():
    sol = Solution()
    assert sol.maxSumBST(makeTree([1,4,3,2,4,2,5,None,None,None,None,None,None,4,6])) == 20, "test 1 failed"
    assert sol.maxSumBST(makeTree([4,3,None,1,2])) == 2, "test 2 failed"
    assert sol.maxSumBST(makeTree([-4,-2,-5])) == 0, "test 3 failed"
    print("✓ maximum-sum-bst-in-binary-tree passed")

if __name__ == "__main__":
    test()
