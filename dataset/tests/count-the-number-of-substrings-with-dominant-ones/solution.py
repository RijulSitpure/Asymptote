class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        n = len(s)
        zero_pos = [i for i, ch in enumerate(s) if ch == '0']
        zero_pos.append(n)
        
        ans = 0
        z_idx = 0
        
        for i in range(n):
            while z_idx < len(zero_pos) - 1 and zero_pos[z_idx] < i:
                z_idx += 1
            
            # Substrings starting at i with zero zeros
            first_zero = zero_pos[z_idx]
            ans += first_zero - i
            
            # Substrings with z zeros (z >= 1)
            k = 1
            while z_idx + k - 1 < len(zero_pos) - 1:
                cur_z = k
                if cur_z * cur_z + cur_z > n - i:
                    break
                p = zero_pos[z_idx + k - 1]
                next_p = zero_pos[z_idx + k]
                min_len = cur_z * cur_z + cur_z
                start_j = max(p, i + min_len - 1)
                if next_p > start_j:
                    ans += next_p - start_j
                k += 1
                
        return ans
