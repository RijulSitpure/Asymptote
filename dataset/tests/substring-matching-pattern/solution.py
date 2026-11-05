class Solution:
    def hasMatch(self, s: str, p: str) -> bool:
        star_idx = p.find('*')
        prefix = p[:star_idx]
        suffix = p[star_idx + 1:]
        
        i = s.find(prefix)
        if i == -1:
            return False
            
        j = s.find(suffix, i + len(prefix))
        return j != -1
