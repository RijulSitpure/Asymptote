from typing import List, Optional

class TreeNode:
    def __init__(self, x):
        self.val = x
        self.left = None
        self.right = None

class Solution:
    def distanceK(self, root: TreeNode, target: TreeNode, k: int) -> List[int]:
        parent = {}
        def build_parent(node, par=None):
            if node:
                parent[node] = par
                build_parent(node.left, node)
                build_parent(node.right, node)

        build_parent(root)
        ans = []
        visited = {target}

        def find_k(node, dist):
            if not node:
                return
            if dist == k:
                ans.append(node.val)
                return
            for nxt in (node.left, node.right, parent[node]):
                if nxt and nxt not in visited:
                    visited.add(nxt)
                    find_k(nxt, dist + 1)

        find_k(target, 0)
        return ans

def build_tree(lst):
    if not lst:
        return None
    nodes = [TreeNode(x) if x is not None else None for x in lst]
    q = [nodes[0]]
    i = 1
    while q and i < len(nodes):
        curr = q.pop(0)
        if curr:
            if i < len(nodes):
                curr.left = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
            if i < len(nodes):
                curr.right = nodes[i]
                if nodes[i]:
                    q.append(nodes[i])
                i += 1
    return nodes[0], nodes

def test():
    sol = Solution()
    root1, nodes1 = build_tree([3, 5, 1, 6, 2, 0, 8, None, None, 7, 4])
    target1 = next(node for node in nodes1 if node and node.val == 5)
    res1 = sorted(sol.distanceK(root1, target1, 2))
    assert res1 == [1, 4, 7], f"test 1 failed: {res1}"

    root2, nodes2 = build_tree([1])
    target2 = next(node for node in nodes2 if node and node.val == 1)
    res2 = sorted(sol.distanceK(root2, target2, 3))
    assert res2 == [], f"test 2 failed: {res2}"
    print("✓ all-nodes-distance-k-in-binary-tree passed")

if __name__ == "__main__":
    test()
