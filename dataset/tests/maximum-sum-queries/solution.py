from bisect import bisect_left

class Solution:
    def maximumSumQueries(self, nums1: list[int], nums2: list[int], queries: list[list[int]]) -> list[int]:
        pairs = sorted(zip(nums1, nums2), key=lambda x: x[0], reverse=True)
        q_sorted = sorted([(qx, qy, i) for i, (qx, qy) in enumerate(queries)], key=lambda x: x[0], reverse=True)
        ans = [-1] * len(queries)
        stack = []
        p = 0
        n = len(pairs)
        for qx, qy, qidx in q_sorted:
            while p < n and pairs[p][0] >= qx:
                x, y = pairs[p]
                s = x + y
                while stack and stack[-1][1] <= s:
                    stack.pop()
                if not stack or stack[-1][0] < y:
                    stack.append((y, s))
                p += 1
            idx = bisect_left(stack, (qy, -1))
            if idx < len(stack):
                ans[qidx] = stack[idx][1]
        return ans
