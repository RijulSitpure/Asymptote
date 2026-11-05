from collections import Counter

class Solution:
    def subsequencesWithMiddleMode(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        n = len(nums)
        if n < 5:
            return 0
            
        left = Counter()
        right = Counter(nums)
        
        S_r2 = sum(c * (c - 1) // 2 for c in right.values())
        S_l2 = 0
        S_lr = 0
        S_lr2 = 0
        S_l2r = 0
        
        def nC2(x: int) -> int:
            return x * (x - 1) // 2 if x >= 2 else 0

        ans = 0
        for i in range(n):
            x = nums[i]
            rx_old = right[x]
            lx = left[x]
            
            S_r2 -= (rx_old - 1)
            S_lr -= lx
            S_lr2 -= lx * (2 * rx_old - 1)
            S_l2r -= lx * lx
            right[x] -= 1
            rx = right[x]
            
            if i >= 2 and n - 1 - i >= 2:
                L = i
                R = n - 1 - i
                lo = L - lx
                ro = R - rx
                
                ans += nC2(lx) * nC2(rx)
                ans += nC2(lx) * rx * ro
                ans += lx * lo * nC2(rx)
                ans += nC2(lx) * nC2(ro)
                ans += nC2(lo) * nC2(rx)
                ans += lx * lo * rx * ro
                
                waysA = lx * lo * nC2(ro)
                waysB = nC2(lo) * rx * ro
                
                sum_ry_C2 = S_r2 - nC2(rx)
                sum_ly_ry = S_lr - lx * rx
                sum_ly_ry2 = S_lr2 - lx * rx * rx
                badA = sum_ry_C2 * lo + ro * sum_ly_ry - sum_ly_ry2
                
                sum_ly_C2 = S_l2 - nC2(lx)
                sum_ly2_ry = S_l2r - lx * lx * rx
                badB = sum_ly_C2 * ro + lo * sum_ly_ry - sum_ly2_ry
                
                ans += (waysA - badA) + (waysB - badB)
                ans %= MOD
                
            S_l2 += lx
            S_lr += rx
            S_lr2 += rx * rx
            S_l2r += (2 * lx + 1) * rx
            left[x] += 1
            
        return (ans % MOD + MOD) % MOD
