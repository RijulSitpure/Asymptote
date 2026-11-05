from collections import Counter

class Solution:
    def subsequencesWithMiddleMode(self, nums: list[int]) -> int:
        def nC2(n: int) -> int:
            return n * (n - 1) // 2 if n >= 2 else 0

        MOD = 1_000_000_007
        n = len(nums)
        if n < 5:
            return 0
            
        left = Counter()
        right = Counter(nums)
        ans = 0
        
        for i in range(n):
            x = nums[i]
            right[x] -= 1
            
            if i >= 2 and n - 1 - i >= 2:
                L = i
                R = n - 1 - i
                lx = left[x]
                rx = right[x]
                lo = L - lx
                ro = R - rx
                
                ans += nC2(lx) * nC2(rx)
                ans += nC2(lx) * rx * ro
                ans += lx * lo * nC2(rx)
                ans += nC2(lx) * nC2(ro)
                ans += nC2(lo) * nC2(rx)
                ans += lx * lo * rx * ro
                
                waysA = lx * lo * nC2(ro)
                badA = 0
                waysB = nC2(lo) * rx * ro
                badB = 0
                
                for y in set(left.keys()) | set(right.keys()):
                    if y == x:
                        continue
                    ly = left[y]
                    ry = right[y]
                    if ly == 0 and ry == 0:
                        continue
                    badA += nC2(ry) * lo + ly * ry * (ro - ry)
                    badB += nC2(ly) * ro + ly * ry * (lo - ly)
                    
                ans += (waysA - badA) + (waysB - badB)
                ans %= MOD
                
            left[x] += 1
            
        return ans % MOD
