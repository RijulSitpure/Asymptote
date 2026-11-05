class Solution:
    def getSum(self, nums: list[int]) -> int:
        MOD = 1_000_000_007
        
        def calc(arr: list[int]) -> int:
            f = {}
            g = {}
            ans = 0
            for v in arr:
                # Sequences of length >= 2 ending at v by extending v - 1
                cnt = f.get(v - 1, 0)
                sum_val = (g.get(v - 1, 0) + cnt * v) % MOD
                ans = (ans + sum_val) % MOD
                
                # Update tables for v: include sequences extending v - 1, plus single element v
                f[v] = (f.get(v, 0) + cnt + 1) % MOD
                g[v] = (g.get(v, 0) + sum_val + v) % MOD
            return ans
            
        x = calc(nums)
        y = calc(nums[::-1])
        s = sum(nums) % MOD
        
        return (x + y + s) % MOD
