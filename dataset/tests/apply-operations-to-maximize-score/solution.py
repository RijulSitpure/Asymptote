from typing import List, Optional
class Solution:
    def maximumScore(self, nums: List[int], k: int) -> int:
        MOD = 10**9 + 7
        max_v = max(nums)
        prime_factors = [0] * (max_v + 1)
        for i in range(2, max_v + 1):
            if prime_factors[i] == 0:
                for j in range(i, max_v + 1, i):
                    prime_factors[j] += 1
        scores = [prime_factors[v] for v in nums]
        n = len(nums)
        left = [-1] * n
        right = [n] * n
        stack = []
        for i in range(n):
            while stack and scores[stack[-1]] < scores[i]:
                stack.pop()
            if stack:
                left[i] = stack[-1]
            stack.append(i)
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and scores[stack[-1]] <= scores[i]:
                stack.pop()
            if stack:
                right[i] = stack[-1]
            stack.append(i)
        items = sorted(range(n), key=lambda i: nums[i], reverse=True)
        ans = 1
        rem_k = k
        for i in items:
            count = (i - left[i]) * (right[i] - i)
            take = min(rem_k, count)
            ans = (ans * pow(nums[i], take, MOD)) % MOD
            rem_k -= take
            if rem_k == 0:
                break
        return ans
