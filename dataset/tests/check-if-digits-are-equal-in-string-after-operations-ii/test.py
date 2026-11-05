
class Solution:
    def hasSameDigits(self, s: str) -> bool:
        n = len(s)
        m = n - 2
        lookup = [[0, 6, 2, 8, 4], [5, 1, 7, 3, 9]]

        def lucas(n_val: int, k_val: int, p: int) -> int:
            res = 1
            while n_val > 0 or k_val > 0:
                ni, ki = n_val % p, k_val % p
                if ni < ki:
                    return 0
                comb = 1
                for i in range(ki):
                    comb = comb * (ni - i) // (i + 1)
                res = (res * (comb % p)) % p
                n_val //= p
                k_val //= p
            return res

        def nck_mod_10(n_val: int, k_val: int) -> int:
            m2 = lucas(n_val, k_val, 2)
            m5 = lucas(n_val, k_val, 5)
            return lookup[m2][m5]

        num1 = 0
        num2 = 0
        for i in range(m + 1):
            c = nck_mod_10(m, i)
            num1 = (num1 + c * int(s[i])) % 10
            num2 = (num2 + c * int(s[i + 1])) % 10
        return num1 == num2

def test_check_if_digits_are_equal_in_string_after_operations_ii():
    sol = Solution()
    assert sol.hasSameDigits("3902") == True
    assert sol.hasSameDigits("34789") == False
    assert sol.hasSameDigits("101010") == True

if __name__ == '__main__':
    test_check_if_digits_are_equal_in_string_after_operations_ii()
    print('All tests passed.')
