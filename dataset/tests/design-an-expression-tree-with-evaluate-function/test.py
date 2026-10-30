class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

    def evaluate(self) -> int:
        if self.val.isdigit(): return int(self.val)
        l = self.left.evaluate()
        r = self.right.evaluate()
        if self.val == '+': return l + r
        if self.val == '-': return l - r
        if self.val == '*': return l * r
        if self.val == '/': return int(l / r)
        return 0

class TreeBuilder:
    def buildTree(self, postfix: list[str]) -> Node:
        stack = []
        for token in postfix:
            if token in {'+', '-', '*', '/'}:
                r = stack.pop()
                l = stack.pop()
                stack.append(Node(token, l, r))
            else:
                stack.append(Node(token))
        return stack[0]

tb = TreeBuilder()
t1 = tb.buildTree(["3","4","+","2","*","7","/"])
assert t1.evaluate() == 2
t2 = tb.buildTree(["4","5","2","+","*"])
assert t2.evaluate() == 28
print("All tests passed successfully.")
