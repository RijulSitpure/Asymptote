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
    def countPairs(self, root, distance: int) -> int:
        self.ans = 0
        def dfs(node):
            if not node:
                return []
            if not node.left and not node.right:
                return [1]
            left_d = dfs(node.left)
            right_d = dfs(node.right)
            for d1 in left_d:
                for d2 in right_d:
                    if d1 + d2 <= distance:
                        self.ans += 1
            return [d + 1 for d in left_d + right_d if d + 1 < distance]
        dfs(root)
        return self.ans

def test():
    sol = Solution()
    assert sol.countPairs(makeTree([1,2,3,None,4]), 3) == 1, "test 1 failed"
    assert sol.countPairs(makeTree([1,2,3,4,5,6,7]), 3) == 2, "test 2 failed"
    assert sol.countPairs(makeTree([7,1,4,6,None,5,3,None,None,None,None,None,2]), 3) == 1, "test 3 failed"
    print("✓ number-of-good-leaf-nodes-pairs passed")

if __name__ == "__main__":
    test()
