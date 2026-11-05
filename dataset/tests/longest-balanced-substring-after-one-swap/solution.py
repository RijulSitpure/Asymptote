def longestBalancedSubstring(s: str) -> int:
    total_zeros = s.count('0')
    total_ones = s.count('1')
    first_occ = {0: [0]}
    n = len(s)
    pref_zeros = [0] * (n + 1)
    pref_ones = [0] * (n + 1)
    pref = 0
    for i, c in enumerate(s):
        pref_zeros[i + 1] = pref_zeros[i] + (1 if c == '0' else 0)
        pref_ones[i + 1] = pref_ones[i] + (1 if c == '1' else 0)
        pref += (1 if c == '1' else -1)
        if pref not in first_occ:
            first_occ[pref] = []
        if len(first_occ[pref]) < 5:
            first_occ[pref].append(i + 1)
    max_len = 0
    cur_pref = 0
    for i in range(1, n + 1):
        cur_pref += (1 if s[i - 1] == '1' else -1)
        if cur_pref in first_occ:
            j = first_occ[cur_pref][0]
            if j < i:
                max_len = max(max_len, i - j)
        target = cur_pref - 2
        if target in first_occ:
            for j in first_occ[target]:
                if j < i:
                    if total_zeros - (pref_zeros[i] - pref_zeros[j]) > 0:
                        max_len = max(max_len, i - j)
                        break
        target = cur_pref + 2
        if target in first_occ:
            for j in first_occ[target]:
                if j < i:
                    if total_ones - (pref_ones[i] - pref_ones[j]) > 0:
                        max_len = max(max_len, i - j)
                        break
    return max_len