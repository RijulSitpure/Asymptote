class Solution:
    def canMakePalindromeQueries(self, s: str, queries: list[list[int]]) -> list[bool]:
        n = len(s)
        m = n // 2
        s1 = s[:m]
        s2 = s[m:][::-1]
        diff = [0] * (m + 1)
        for i in range(m):
            diff[i + 1] = diff[i] + (1 if s1[i] != s2[i] else 0)
        cnt1 = [[0] * 26 for _ in range(m + 1)]
        cnt2 = [[0] * 26 for _ in range(m + 1)]
        for i in range(m):
            for c in range(26):
                cnt1[i + 1][c] = cnt1[i][c]
                cnt2[i + 1][c] = cnt2[i][c]
            cnt1[i + 1][ord(s1[i]) - 97] += 1
            cnt2[i + 1][ord(s2[i]) - 97] += 1

        def get_cnt(pref, l, r):
            if l > r:
                return [0] * 26
            return [pref[r + 1][c] - pref[l][c] for c in range(26)]

        ans = []
        for a, b, c, d in queries:
            c_prime = n - 1 - d
            d_prime = n - 1 - c
            l1, r1 = a, b
            l2, r2 = c_prime, d_prime
            min_l = min(l1, l2)
            max_r = max(r1, r2)
            if diff[min_l] > 0 or (diff[m] - diff[max_r + 1]) > 0:
                ans.append(False)
                continue
            if max(l1, l2) > min(r1, r2) + 1:
                mid_l = min(r1, r2) + 1
                mid_r = max(l1, l2) - 1
                if diff[mid_r + 1] - diff[mid_l] > 0:
                    ans.append(False)
                    continue
            c1 = get_cnt(cnt1, l1, r1)
            c2 = get_cnt(cnt2, l2, r2)
            if r1 < l2 or r2 < l1:
                ok1 = (c1 == get_cnt(cnt2, l1, r1))
                ok2 = (c2 == get_cnt(cnt1, l2, r2))
                ans.append(ok1 and ok2)
            else:
                inter_l = max(l1, l2)
                inter_r = min(r1, r2)
                ok = True
                rem1 = [c1[k] for k in range(26)]
                rem2 = [c2[k] for k in range(26)]
                if l1 < inter_l:
                    sub = get_cnt(cnt2, l1, inter_l - 1)
                    for k in range(26):
                        rem1[k] -= sub[k]
                        if rem1[k] < 0: ok = False
                elif l2 < inter_l:
                    sub = get_cnt(cnt1, l2, inter_l - 1)
                    for k in range(26):
                        rem2[k] -= sub[k]
                        if rem2[k] < 0: ok = False
                if r1 > inter_r:
                    sub = get_cnt(cnt2, inter_r + 1, r1)
                    for k in range(26):
                        rem1[k] -= sub[k]
                        if rem1[k] < 0: ok = False
                elif r2 > inter_r:
                    sub = get_cnt(cnt1, inter_r + 1, r2)
                    for k in range(26):
                        rem2[k] -= sub[k]
                        if rem2[k] < 0: ok = False
                if not ok or rem1 != rem2:
                    ans.append(False)
                else:
                    ans.append(True)
        return ans
