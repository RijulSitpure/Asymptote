from typing import Optional

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def widthOfBinaryTree(self, root: Optional[TreeNode]) -> int:
        if not root:
            return 0
        max_width = 0
        queue = [(root, 0)]
        while queue:
            first_idx = queue[0][1]
            curr_width = queue[-1][1] - first_idx + 1
            if curr_width > max_width:
                max_width = curr_width
            next_queue = []
            for node, idx in queue:
                norm_idx = idx - first_idx
                if node.left:
                    next_queue.append((node.left, 2 * norm_idx))
                if node.right:
                    next_queue.append((node.right, 2 * norm_idx + 1))
            queue = next_queue
        return max_width

def build_tree(lst):
    if not lst:
        return None
    root = TreeNode(lst[0])
    q = [root]
    i = 1
    while q and i < len(lst):
        node = q.pop(0)
        if i < len(lst) and lst[i] is not None:
            node.left = TreeNode(lst[i])
            q.append(node.left)
        i += 1
        if i < len(lst) and lst[i] is not None:
            node.right = TreeNode(lst[i])
            q.append(node.right)
        i += 1
    return root

def test():
    sol = Solution()
    t1 = build_tree([1, 3, 2, 5, 3, None, 9])
    assert sol.widthOfBinaryTree(t1) == 4, "test 1 failed"
    t2 = build_tree([1, 3, 2, 5, None, None, 9, 6, None, 7])
    assert sol.widthOfBinaryTree(t2) == 7, "test 2 failed"
    print("✓ maximum-width-of-binary-tree passed")

if __name__ == "__main__":
    test()
