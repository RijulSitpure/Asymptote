class Solution:
    def countPairs(self, nums: list[int]) -> int:
        from collections import defaultdict
        
        def get_all_swaps(val):
            s = list(str(val).zfill(7))
            forms = {int("".join(s))}
            L = len(s)
            
            # 1 swap
            for i in range(L):
                for j in range(i + 1, L):
                    s[i], s[j] = s[j], s[i]
                    forms.add(int("".join(s)))
                    
                    # 2 swaps
                    for k in range(i + 1, L):
                        for l in range(k + 1, L):
                            s[k], s[l] = s[l], s[k]
                            forms.add(int("".join(s)))
                            s[k], s[l] = s[l], s[k]
                            
                    s[i], s[j] = s[j], s[i]
            return forms
            
        freq = defaultdict(int)
        ans = 0
        for x in nums:
            forms = get_all_swaps(x)
            for f in forms:
                ans += freq[f]
            freq[x] += 1
        return ans
