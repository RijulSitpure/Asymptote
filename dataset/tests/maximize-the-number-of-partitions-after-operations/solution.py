class Solution:
    def maxPartitionsAfterOperations(self, s: str, k: int) -> int:
        if k == 26:
            return 1
        memo = {}
        def dfs(i: int, mask: int, changed: bool) -> int:
            if i == len(s):
                return 1
            state = (i, mask, changed)
            if state in memo:
                return memo[state]
            bit = 1 << (ord(s[i]) - 97)
            new_mask = mask | bit
            if bin(new_mask).count('1') > k:
                res = 1 + dfs(i + 1, bit, changed)
            else:
                res = dfs(i + 1, new_mask, changed)
            if not changed:
                for c in range(26):
                    c_bit = 1 << c
                    new_mask2 = mask | c_bit
                    if bin(new_mask2).count('1') > k:
                        cand = 1 + dfs(i + 1, c_bit, True)
                    else:
                        cand = dfs(i + 1, new_mask2, True)
                    res = max(res, cand)
            memo[state] = res
            return res
        return dfs(0, 0, False)
