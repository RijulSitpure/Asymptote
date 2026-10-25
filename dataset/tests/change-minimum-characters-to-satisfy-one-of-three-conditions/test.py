class Solution:
    def minCharacters(self, a: str, b: str) -> int:
        m, n = len(a), len(b)
        cnt_a = [0] * 26
        cnt_b = [0] * 26
        for c in a:
            cnt_a[ord(c) - ord('a')] += 1
        for c in b:
            cnt_b[ord(c) - ord('a')] += 1

        ans = (m - max(cnt_a)) + (n - max(cnt_b))

        pref_a = 0
        pref_b = 0
        for i in range(25):
            pref_a += cnt_a[i]
            pref_b += cnt_b[i]
            cost1 = (m - pref_a) + pref_b
            cost2 = (n - pref_b) + pref_a
            ans = min(ans, cost1, cost2)

        return ans

def test():
    sol = Solution()
    assert sol.minCharacters("aba", "caa") == 2
    assert sol.minCharacters("dabadd", "cda") == 3

    print("✓ change-minimum-characters-to-satisfy-one-of-three-conditions passed")

if __name__ == '__main__':
    test()
