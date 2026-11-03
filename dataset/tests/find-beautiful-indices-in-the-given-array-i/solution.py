class Solution:
    def beautifulIndices(self, s: str, a: str, b: str, k: int) -> list[int]:
        import bisect
        def find_all(pat: str) -> list[int]:
            res = []
            pos = s.find(pat)
            while pos != -1:
                res.append(pos)
                pos = s.find(pat, pos + 1)
            return res
        a_idx = find_all(a)
        b_idx = find_all(b)
        if not a_idx or not b_idx:
            return []
        ans = []
        for i in a_idx:
            idx = bisect.bisect_left(b_idx, i)
            found = False
            if idx < len(b_idx) and abs(b_idx[idx] - i) <= k:
                found = True
            elif idx > 0 and abs(b_idx[idx - 1] - i) <= k:
                found = True
            if found:
                ans.append(i)
        return ans
