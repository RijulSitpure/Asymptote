class Solution:
    def isPreorder(self, nodes: list[list[int]]) -> bool:
        stack = []
        for u, p in nodes:
            if p == -1:
                stack.append(u)
                continue
            while stack and stack[-1] != p:
                stack.pop()
            if not stack:
                return False
            stack.append(u)
        return True
