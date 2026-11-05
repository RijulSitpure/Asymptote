class Solution:
    def minimumMoves(self, nums: list[int], k: int, maxChanges: int) -> int:
        pos = [i for i, x in enumerate(nums) if x == 1]
        n = len(nums)
        c = 0
        for i in range(n):
            if nums[i] == 1:
                cnt = 1
                if i > 0 and nums[i - 1] == 1: cnt += 1
                if i + 1 < n and nums[i + 1] == 1: cnt += 1
                c = max(c, cnt)
        c = min(c, k)
        if maxChanges >= k - c:
            return max(0, c - 1) + 2 * (k - c)
        m = len(pos)
        pref = [0] * (m + 1)
        for i in range(m):
            pref[i + 1] = pref[i] + pos[i]
        ans = float('inf')
        size = k - maxChanges
        for i in range(m - size + 1):
            mid = i + size // 2
            p_mid = pos[mid]
            left_cnt = mid - i
            right_cnt = i + size - 1 - mid
            left_cost = p_mid * left_cnt - (pref[mid] - pref[i])
            right_cost = (pref[i + size] - pref[mid + 1]) - p_mid * right_cnt
            cost = left_cost + right_cost + 2 * maxChanges
            ans = min(ans, cost)
        return ans
