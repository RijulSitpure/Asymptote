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

from collections import deque

class Solution:
    def deepestLeavesSum(self, root) -> int:
        q = deque([root])
        level_sum = 0
        while q:
            level_sum = 0
            for _ in range(len(q)):
                node = q.popleft()
                level_sum += node.val
                if node.left:
                    q.append(node.left)
                if node.right:
                    q.append(node.right)
        return level_sum

def test():
    sol = Solution()
    assert sol.deepestLeavesSum(makeTree([1,2,3,4,5,None,6,7,None,None,None,None,8])) == 15, "test 1 failed"
    assert sol.deepestLeavesSum(makeTree([6,7,8,2,7,1,3,9,None,1,4,None,None,None,5])) == 19, "test 2 failed"
    print("✓ deepest-leaves-sum passed")

if __name__ == "__main__":
    test()
