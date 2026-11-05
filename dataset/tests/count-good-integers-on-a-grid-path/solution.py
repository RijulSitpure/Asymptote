def countGoodIntegersOnGridPath(l: int, r: int, directions: str) -> int:
    path_indices = [0]
    cr, cc = 0, 0
    for move in directions:
        if move == 'D':
            cr += 1
        else:
            cc += 1
        path_indices.append(cr * 4 + cc)
    path_set = set(path_indices)
    
    def count_up_to(n: int) -> int:
        if n < 0:
            return 0
        s = str(n).zfill(16)
        memo = {}
        
        def dp(idx: int, is_less: bool, last_val: int) -> int:
            if idx == 16:
                return 1
            state = (idx, is_less, last_val)
            if state in memo:
                return memo[state]
            limit = 9 if is_less else int(s[idx])
            total = 0
            is_on_path = idx in path_set
            start_digit = last_val if is_on_path else 0
            for d in range(start_digit, limit + 1):
                nxt_less = is_less or (d < limit)
                nxt_last = d if is_on_path else last_val
                total += dp(idx + 1, nxt_less, nxt_last)
            memo[state] = total
            return total
            
        return dp(0, False, 0)
        
    return count_up_to(r) - count_up_to(l - 1)