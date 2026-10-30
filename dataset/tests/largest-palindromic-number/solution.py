from collections import Counter

class Solution:
    def largestPalindromic(self, num: str) -> str:
        counts = Counter(num)
        first_half = []
        for d in range(9, -1, -1):
            ch = str(d)
            if ch in counts:
                if d == 0 and not first_half:
                    continue
                pairs = counts[ch] // 2
                if pairs > 0:
                    first_half.append(ch * pairs)
                    counts[ch] %= 2
        first_str = "".join(first_half)
        mid = ""
        for d in range(9, -1, -1):
            ch = str(d)
            if counts.get(ch, 0) > 0:
                mid = ch
                break
        ans = first_str + mid + first_str[::-1]
        return ans if ans else "0"
