class Solution:
    def subStrHash(self, s: str, power: int, modulo: int, k: int, hashValue: int) -> str:
        n = len(s)
        curr = 0
        pk = 1
        for i in range(k):
            if i > 0:
                pk = (pk * power) % modulo
        
        for i in range(n - 1, n - k - 1, -1):
            val = ord(s[i]) - ord('a') + 1
            curr = (curr * power + val) % modulo
            
        res_idx = -1
        if curr == hashValue:
            res_idx = n - k
            
        for i in range(n - k - 1, -1, -1):
            val_out = ord(s[i + k]) - ord('a') + 1
            val_in = ord(s[i]) - ord('a') + 1
            curr = ((curr - val_out * pk) % modulo + modulo) % modulo
            curr = (curr * power + val_in) % modulo
            if curr == hashValue:
                res_idx = i
                
        return s[res_idx:res_idx + k]
