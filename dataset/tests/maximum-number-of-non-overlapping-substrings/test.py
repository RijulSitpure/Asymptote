class Solution:
    def maxNumOfSubstrings(self, s: str) -> list[str]:
        first = {}
        last = {}
        for i, ch in enumerate(s):
            if ch not in first:
                first[ch] = i
            last[ch] = i
        intervals = []
        for ch in first:
            l = first[ch]
            r = last[ch]
            valid = True
            i = l
            while i <= r:
                c = s[i]
                if first[c] < l:
                    valid = False
                    break
                r = max(r, last[c])
                i += 1
            if valid:
                intervals.append((r, l))
        intervals.sort()
        ans = []
        prev_r = -1
        for r, l in intervals:
            if l > prev_r:
                ans.append(s[l:r + 1])
                prev_r = r
        return ans

def test():
    sol = Solution()
    assert sol.maxNumOfSubstrings("adeffaddab") == ["e","ff","b"], "test 1 failed"
    assert sol.maxNumOfSubstrings("abbaccd") == ["bb","cc","d"], "test 2 failed"
    print("✓ maximum-number-of-non-overlapping-substrings passed")

if __name__ == "__main__":
    test()
