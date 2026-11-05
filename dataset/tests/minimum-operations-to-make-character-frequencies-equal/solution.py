class Solution:
    def makeStringGood(self, s: str) -> int:
        cnt = [0] * 26
        for ch in s:
            cnt[ord(ch) - 97] += 1
            
        max_cnt = max(cnt)
        ans = len(s)
        
        for target in range(1, max_cnt + 1):
            f = [0] * 27
            f[25] = min(cnt[25], abs(cnt[25] - target))
            
            for i in range(24, -1, -1):
                x = cnt[i]
                f[i] = f[i + 1] + min(x, abs(x - target))
                
                y = cnt[i + 1]
                if y < target:
                    if x >= target:
                        cost = max(x - target, target - y)
                    else:
                        cost = max(x, target - y)
                    f[i] = min(f[i], f[i + 2] + cost)
                    
            if f[0] < ans:
                ans = f[0]
                
        return ans
