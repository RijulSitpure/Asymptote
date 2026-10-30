import math

class Solution:
    def abbreviateProduct(self, left: int, right: int) -> str:
        cnt2 = 0
        cnt5 = 0
        for x in range(left, right + 1):
            temp = x
            while temp % 2 == 0:
                cnt2 += 1
                temp //= 2
            while temp % 5 == 0:
                cnt5 += 1
                temp //= 5

        zeros = min(cnt2, cnt5)

        # Total digits calculation via log10
        total_log = sum(math.log10(x) for x in range(left, right + 1)) - zeros
        num_digits = int(total_log) + 1

        # Suffix calculation
        rem2 = zeros
        rem5 = zeros
        suff = 1
        is_large = False

        for x in range(left, right + 1):
            temp = x
            while rem2 > 0 and temp % 2 == 0:
                rem2 -= 1
                temp //= 2
            while rem5 > 0 and temp % 5 == 0:
                rem5 -= 1
                temp //= 5

            suff *= temp
            if suff >= 10 ** 10:
                is_large = True
                suff %= 10 ** 10

        if not is_large and suff < 10 ** 10:
            return f"{suff}e{zeros}"

        # Prefix from fractional part of log10
        frac = total_log - int(total_log)
        pref = int(10 ** (frac + 4))

        last_five = suff % (10 ** 5)
        return f"{pref}...{last_five:05d}e{zeros}"
