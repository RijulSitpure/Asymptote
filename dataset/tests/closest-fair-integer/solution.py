class Solution:
    def closestFair(self, n: int) -> int:
        s = str(n)
        length = len(s)
        if length % 2 == 1:
            half = (length + 1) // 2
            return int("1" + "0" * half + "1" * (half - 1))
        
        cur = n
        while True:
            s_cur = str(cur)
            if len(s_cur) > length:
                half = len(s_cur) // 2
                return int("1" + "0" * half + "1" * (half - 1))
            even_cnt = sum(1 for c in s_cur if int(c) % 2 == 0)
            odd_cnt = len(s_cur) - even_cnt
            if even_cnt == odd_cnt:
                return cur
            cur += 1
