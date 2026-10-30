class Solution:
    def minMaxDifference(self, num: int) -> int:
        s = str(num)
        max_d = None
        for ch in s:
            if ch != '9':
                max_d = ch
                break
        max_val = int(s.replace(max_d, '9')) if max_d else num
        min_d = s[0]
        min_val = int(s.replace(min_d, '0'))
        return max_val - min_val
