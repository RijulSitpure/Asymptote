class Node:
    def __init__(self, val=0, children=None):
        self.val = val
        self.children = children if children is not None else []

class Solution:
    def moveSubTree(self, root: Node, p: Node, q: Node) -> Node:
        if p in q.children: return root
        dummy = Node(0, [root])
        parents = {}
        def find_parents(node):
            for child in node.children:
                parents[child] = node
                find_parents(child)
        find_parents(dummy)
        def is_descendant(anc, desc):
            curr = desc
            while curr in parents:
                curr = parents[curr]
                if curr == anc: return True
            return False
        p_parent = parents[p]
        q_parent = parents[q]
        if is_descendant(p, q):
            q_parent.children.remove(q)
            idx = p_parent.children.index(p)
            p_parent.children[idx] = q
            q.children.append(p)
        else:
            p_parent.children.remove(p)
            q.children.append(p)
        return dummy.children[0]

sol = Solution()
r1 = Node(1)
r2 = Node(2)
r3 = Node(3)
r1.children = [r2, r3]
res = sol.moveSubTree(r1, r2, r3)
assert res == r1
assert r2 in r3.children
print("All tests passed successfully.")
