from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelSums(root: TreeNode) -> list[int]:
    if not root:
        return []
    res = []
    q = deque([root])
    while q:
        lvl_sum = 0
        for _ in range(len(q)):
            node = q.popleft()
            lvl_sum += node.val
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(lvl_sum)
    return res