class Solution:
    def minReverseOperations(self, n: int, p: int, banned: list[int], k: int) -> list[int]:
        from collections import deque
        ans = [-1] * n
        parent = list(range(n + 2))
        def find(i):
            path = []
            while parent[i] != i:
                path.append(i)
                i = parent[i]
            for node in path:
                parent[node] = i
            return i
        for b in banned:
            parent[b] = find(b + 2)
        parent[p] = find(p + 2)
        ans[p] = 0
        q = deque([p])
        while q:
            u = q.popleft()
            min_l = max(0, u - k + 1)
            max_l = min(n - k, u)
            left = 2 * min_l + k - 1 - u
            right = 2 * max_l + k - 1 - u
            curr = find(left)
            while curr <= right:
                ans[curr] = ans[u] + 1
                q.append(curr)
                parent[curr] = find(curr + 2)
                curr = find(curr)
        return ans
