class Solution:
    def minMaxWeight(self, n: int, edges: list[list[int]], threshold: int) -> int:
        rev_graph = [[] for _ in range(n)]
        max_w = 0
        for u, v, w in edges:
            rev_graph[v].append((u, w))
            max_w = max(max_w, w)
            
        def can_reach_all(limit: int) -> bool:
            seen = [False] * n
            st = [0]
            seen[0] = True
            count = 1
            while st:
                u = st.pop()
                for v, w in rev_graph[u]:
                    if not seen[v] and w <= limit:
                        seen[v] = True
                        count += 1
                        st.append(v)
            return count == n

        low, high = 1, max_w
        ans = -1
        while low <= high:
            mid = (low + high) // 2
            if can_reach_all(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans
