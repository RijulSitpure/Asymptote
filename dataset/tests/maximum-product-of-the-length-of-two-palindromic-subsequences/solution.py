class Solution:
    def maxProduct(self, s: str) -> int:
        n = len(s)
        pal = {}
        for mask in range(1, 1 << n):
            sub = [s[i] for i in range(n) if (mask & (1 << i))]
            if sub == sub[::-1]:
                pal[mask] = len(sub)
        ans = 0
        pal_list = list(pal.items())
        for i in range(len(pal_list)):
            m1, l1 = pal_list[i]
            for j in range(i + 1, len(pal_list)):
                m2, l2 = pal_list[j]
                if (m1 & m2) == 0:
                    ans = max(ans, l1 * l2)
        return ans
