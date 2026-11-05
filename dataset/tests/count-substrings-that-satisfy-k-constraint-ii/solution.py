class Solution:
    def countKConstraintSubstrings(self, s: str, k: int, queries: list[list[int]]) -> list[int]:
        n = len(s)
        # For each right end, find min left start that satisfies k-constraint
        left_bound = [0] * n
        l = 0
        z, o = 0, 0
        for r in range(n):
            if s[r] == '0': z += 1
            else: o += 1
            while z > k and o > k:
                if s[l] == '0': z -= 1
                else: o -= 1
                l += 1
            left_bound[r] = l
            
        # pref[r + 1] = sum of (r - left_bound[r] + 1)
        pref = [0] * (n + 1)
        for r in range(n):
            pref[r + 1] = pref[r] + (r - left_bound[r] + 1)
            
        ans = []
        for ql, qr in queries:
            import bisect
            # Find first index where left_bound[i] >= ql
            idx = bisect.bisect_left(left_bound, ql, ql, qr + 1)
            # For i in [ql, idx - 1], full subsegment length is (i - ql + 1)
            # sum_{i=ql}^{idx-1} (i - ql + 1) = len * (len + 1) // 2
            cnt1 = idx - ql
            res1 = cnt1 * (cnt1 + 1) // 2
            # For i in [idx, qr], left_bound[i] >= ql, so we use pref
            res2 = pref[qr + 1] - pref[idx]
            ans.append(res1 + res2)
        return ans
