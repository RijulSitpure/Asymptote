class Solution:
    def minStartingIndex(self, s: str, pattern: str) -> int:
        def z_function(st: str) -> list[int]:
            n = len(st)
            z = [0] * n
            l, r = 0, 0
            for i in range(1, n):
                if i <= r:
                    z[i] = min(r - i + 1, z[i - l])
                while i + z[i] < n and st[z[i]] == st[i + z[i]]:
                    z[i] += 1
                if i + z[i] - 1 > r:
                    l = i
                    r = i + z[i] - 1
            return z
            
        n = len(s)
        m = len(pattern)
        if m > n:
            return -1
            
        z1 = z_function(pattern + s)
        z2 = z_function(pattern[::-1] + s[::-1])
        
        for i in range(n - m + 1):
            common_prefix = z1[m + i]
            common_suffix = z2[n - i]
            if common_prefix + common_suffix >= m - 1:
                return i
                
        return -1
