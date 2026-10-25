from collections import deque

class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: list[int], rightChild: list[int]) -> bool:
        in_degree = [0] * n
        for c in leftChild + rightChild:
            if c != -1:
                in_degree[c] += 1
                if in_degree[c] > 1:
                    return False
        roots = [i for i in range(n) if in_degree[i] == 0]
        if len(roots) != 1:
            return False
        root = roots[0]
        visited = set()
        q = deque([root])
        while q:
            u = q.popleft()
            if u in visited:
                return False
            visited.add(u)
            for child in [leftChild[u], rightChild[u]]:
                if child != -1:
                    q.append(child)
        return len(visited) == n

def test():
    sol = Solution()
    assert sol.validateBinaryTreeNodes(4, [1,-1,3,-1], [2,-1,-1,-1]) == True, "test 1 failed"
    assert sol.validateBinaryTreeNodes(4, [1,-1,3,-1], [2,3,-1,-1]) == False, "test 2 failed"
    assert sol.validateBinaryTreeNodes(2, [1,0], [-1,-1]) == False, "test 3 failed"
    print("✓ validate-binary-tree-nodes passed")

if __name__ == "__main__":
    test()
