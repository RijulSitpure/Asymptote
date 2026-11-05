class Solution:
    def countNoZeroPairs(self, n: int) -> int:
        digits = [int(c) for c in str(n)][::-1]
        from functools import lru_cache
        
        @lru_cache(None)
        def dp(idx: int, carry: int, active_a: bool, active_b: bool) -> int:
            if idx == len(digits):
                return 1 if carry == 0 else 0
            target = digits[idx]
            ans = 0
            choices_a = [0] if not active_a else ([0] + list(range(1, 10)) if idx > 0 else list(range(1, 10)))
            choices_b = [0] if not active_b else ([0] + list(range(1, 10)) if idx > 0 else list(range(1, 10)))
            for da in choices_a:
                next_a = active_a and (da > 0)
                for db in choices_b:
                    next_b = active_b and (db > 0)
                    tot = da + db + carry
                    if tot % 10 == target:
                        ans += dp(idx + 1, tot // 10, next_a, next_b)
            return ans
            
        return dp(0, 0, True, True)

def run_tests():
    sol = Solution()
    assert sol.countNoZeroPairs(11) == 8
    assert sol.countNoZeroPairs(2) == 1
    assert sol.countNoZeroPairs(100) == 90
    print("All tests passed for 3704.")

if __name__ == "__main__":
    run_tests()