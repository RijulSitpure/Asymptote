class Solution:
    def minCostGoodCaption(self, caption: str) -> str:
        n = len(caption)
        if n < 3:
            return ""
        
        dp = [None] * (n + 1)
        dp[n] = (0, 0, "")
        
        def get_char(idx, pos):
            curr = idx
            while curr < n:
                _, l, c = dp[curr]
                if pos < curr + l:
                    return c
                curr += l
            return ""

        def is_better(c1, l1, c2, l2, i):
            if c1 != c2:
                return c1 < c2
            p1 = i + l1
            p2 = i + l2
            while p1 < n and p2 < n:
                ch1 = get_char(p1, p1)
                ch2 = get_char(p2, p2)
                if ch1 != ch2:
                    return ch1 < ch2
                p1 += 1
                p2 += 1
            return False

        for i in range(n - 1, -1, -1):
            rem = n - i
            if rem < 3:
                dp[i] = (float("inf"), 0, "")
                continue
                
            best_cost = float("inf")
            best_l = 0
            best_c = ""
            
            for L in (3, 4, 5):
                if i + L <= n:
                    if n - (i + L) in (1, 2):
                        continue
                    next_cost = dp[i + L][0]
                    if next_cost == float("inf"):
                        continue
                    
                    for c_ord in range(ord("a"), ord("z") + 1):
                        ch = chr(c_ord)
                        cost = sum(abs(ord(caption[j]) - c_ord) for j in range(i, i + L))
                        tot_cost = cost + next_cost
                        if tot_cost < best_cost:
                            best_cost = tot_cost
                            best_l = L
                            best_c = ch
                        elif tot_cost == best_cost:
                            if is_better(ch, L, best_c, best_l, i):
                                best_cost = tot_cost
                                best_l = L
                                best_c = ch
            dp[i] = (best_cost, best_l, best_c)
            
        res = []
        curr = 0
        while curr < n:
            _, l, c = dp[curr]
            res.append(c * l)
            curr += l
        return "".join(res)
