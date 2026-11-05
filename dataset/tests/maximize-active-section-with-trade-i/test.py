class Solution:
    def maxActiveSectionsAfterTrade(self, s: str) -> int:
        n = len(s)
        ans = 0
        i = 0
        pre, mx = -float('inf'), 0

        while i < n:
            j = i
            while j < n and s[j] == s[i]:
                j += 1
            cur = j - i

            if s[i] == '1':
                ans += cur
            else:
                if pre + cur > mx:
                    mx = pre + cur
                pre = cur
            i = j

        return ans + mx

def run_tests():
    s = Solution()
    assert s.maxActiveSectionsAfterTrade("010") == 3
    assert s.maxActiveSectionsAfterTrade("00100") == 5
    print("All tests passed for maximize-active-section-with-trade-i")

if __name__ == '__main__':
    run_tests()
