class Node:
    def __init__(self, val=' ', left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def expTree(self, s: str) -> Node:
        ops = []
        nodes = []
        prec = {'+': 1, '-': 1, '*': 2, '/': 2}
        def reduce():
            op = ops.pop()
            r = nodes.pop()
            l = nodes.pop()
            nodes.append(Node(op, l, r))
        for ch in s:
            if ch.isdigit():
                nodes.append(Node(ch))
            elif ch == '(':
                ops.append(ch)
            elif ch == ')':
                while ops and ops[-1] != '(':
                    reduce()
                ops.pop()
            else:
                while ops and ops[-1] in prec and prec[ops[-1]] >= prec[ch]:
                    reduce()
                ops.append(ch)
        while ops:
            reduce()
        return nodes[0]

sol = Solution()
r1 = sol.expTree("3*4-2*5")
assert r1.val == '-'
assert r1.left.val == '*'
assert r1.right.val == '*'
print("All tests passed successfully.")
