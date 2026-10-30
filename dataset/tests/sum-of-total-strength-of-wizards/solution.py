class Solution:
    def totalStrength(self, strength: list[int]) -> int:
        MOD = 1_000_000_007
        n = len(strength)
        
        left = [-1] * n
        stk = []
        for i in range(n):
            while stk and strength[stk[-1]] >= strength[i]:
                stk.pop()
            left[i] = stk[-1] if stk else -1
            stk.append(i)
            
        right = [n] * n
        stk = []
        for i in range(n - 1, -1, -1):
            while stk and strength[stk[-1]] > strength[i]:
                stk.pop()
            right[i] = stk[-1] if stk else n
            stk.append(i)
            
        pref = [0] * (n + 1)
        for i in range(n):
            pref[i + 1] = (pref[i] + strength[i]) % MOD
            
        pref_pref = [0] * (n + 2)
        for i in range(n + 1):
            pref_pref[i + 1] = (pref_pref[i] + pref[i]) % MOD
            
        ans = 0
        for i in range(n):
            L = left[i] + 1
            R = right[i] - 1
            left_count = i - L + 1
            right_count = R - i + 1
            
            pos_part = (pref_pref[R + 2] - pref_pref[i + 1]) * left_count
            neg_part = (pref_pref[i + 1] - pref_pref[L]) * right_count
            total_sum = (pos_part - neg_part) % MOD
            ans = (ans + strength[i] * total_sum) % MOD
            
        return ans
