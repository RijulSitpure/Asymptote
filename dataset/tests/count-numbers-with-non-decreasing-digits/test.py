class Solution:
    def countNumbers(self, l: str, r: str, b: int) -> int:
        MOD = 1_000_000_007

        def to_base_b(num_str: str) -> list[int]:
            n = int(num_str)
            if n == 0:
                return [0]
            digits = []
            while n > 0:
                digits.append(n % b)
                n //= b
            return digits[::-1]

        def count_valid(num_digits: list[int]) -> int:
            memo = {}
            def dfs(pos: int, last: int, is_tight: bool, is_leading: bool) -> int:
                if pos == len(num_digits):
                    return 1
                state = (pos, last, is_tight, is_leading)
                if state in memo:
                    return memo[state]
                limit = num_digits[pos] if is_tight else b - 1
                res = 0
                for d in range(limit + 1):
                    if is_leading and d == 0:
                        res = (res + dfs(pos + 1, 0, is_tight and (d == limit), True)) % MOD
                    else:
                        if d >= last:
                            res = (res + dfs(pos + 1, d, is_tight and (d == limit), False)) % MOD
                memo[state] = res
                return res
            return dfs(0, 0, True, True)

        def is_valid(num_str: str) -> bool:
            digs = to_base_b(num_str)
            return all(digs[i] <= digs[i + 1] for i in range(len(digs) - 1))

        cnt_r = count_valid(to_base_b(r))
        cnt_l = count_valid(to_base_b(l))
        ans = (cnt_r - cnt_l + (1 if is_valid(l) else 0)) % MOD
        return (ans + MOD) % MOD

def run_tests():
    s = Solution()
    assert s.countNumbers("1", "20", 10) == 18
    assert s.countNumbers("10", "15", 10) == 5
    print("All tests passed for count-numbers-with-non-decreasing-digits")

if __name__ == '__main__':
    run_tests()
