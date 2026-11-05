class Solution:
    def countBalanced(self, low: str, high: str) -> int:
        MOD = 1_000_000_007
        
        def count_up_to(s: str) -> int:
            memo = {}
            def dfs(i: int, diff: int, is_tight: bool, started: bool) -> int:
                if i == len(s):
                    return 1 if started and diff == 0 else 0
                state = (i, diff, is_tight, started)
                if state in memo:
                    return memo[state]
                
                limit = int(s[i]) if is_tight else 9
                res = 0
                for d in range(limit + 1):
                    next_tight = is_tight and (d == limit)
                    if not started and d == 0:
                        res = (res + dfs(i + 1, diff, next_tight, False)) % MOD
                    else:
                        new_diff = diff + d if i % 2 == 0 else diff - d
                        res = (res + dfs(i + 1, new_diff, next_tight, True)) % MOD
                memo[state] = res
                return res
            return dfs(0, 0, True, False)
        
        ans = (count_up_to(high) - count_up_to(str(int(low) - 1))) % MOD
        return ans

def run_tests():
    sol = Solution()
    # Balanced 2-digit numbers: '11', '22', ..., '99' -> 9 numbers
    assert sol.countBalanced("1", "100") == 9
    assert sol.countBalanced("10", "20") == 1 # only '11'
    print("All tests passed for 3791.")

if __name__ == "__main__":
    run_tests()
