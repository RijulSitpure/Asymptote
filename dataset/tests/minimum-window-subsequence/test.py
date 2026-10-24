class Solution:
    def minWindow(self, s1: str, s2: str) -> str:
        m, n = len(s1), len(s2)
        i = 0
        min_len = float("inf")
        start = -1

        while i < m:
            j = 0
            while i < m and j < n:
                if s1[i] == s2[j]:
                    j += 1
                i += 1
            if j < n:
                break

            end = i
            j = n - 1
            i -= 1
            while j >= 0:
                if s1[i] == s2[j]:
                    j -= 1
                i -= 1
            i += 1

            if end - i < min_len:
                min_len = end - i
                start = i
            i += 1

        return s1[start:start + min_len] if start != -1 else ""

def test():
    sol = Solution()
    assert sol.minWindow("abcdebdde", "bde") == "bcde", "test 1 failed"
    assert sol.minWindow("jmeqqaewmwpuvywldtkunqmanknvacquire", "k") == "k", "test 2 failed"
    print("✓ minimum-window-subsequence passed")

if __name__ == "__main__":
    test()
