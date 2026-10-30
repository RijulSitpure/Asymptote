class Solution:
    def largestVariance(self, s: str) -> int:
        chars = list(set(s))
        ans = 0
        for a in chars:
            for b in chars:
                if a == b:
                    continue
                cnt_a = 0
                cnt_b = 0
                has_b = False
                for ch in s:
                    if ch == a:
                        cnt_a += 1
                    elif ch == b:
                        cnt_b += 1
                    
                    if cnt_b > 0:
                        ans = max(ans, cnt_a - cnt_b)
                    elif has_b:
                        ans = max(ans, cnt_a - 1)
                    
                    if cnt_b > cnt_a:
                        cnt_a = 0
                        cnt_b = 0
                        has_b = True
        return ans
