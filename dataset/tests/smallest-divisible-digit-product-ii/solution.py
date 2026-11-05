import collections

class Solution:
    def smallestNumber(self, num: str, t: int) -> str:
        primes = [2, 3, 5, 7]
        target_p = collections.Counter()
        temp_t = t
        for p in primes:
            while temp_t % p == 0:
                target_p[p] += 1
                temp_t //= p
        if temp_t > 1:
            return '-1'
            
        def get_min_digits(counts):
            twos, threes = counts.get(2, 0), counts.get(3, 0)
            f5, f7 = counts.get(5, 0), counts.get(7, 0)
            f9 = threes // 2
            threes %= 2
            f8 = twos // 3
            twos %= 3
            f6 = 0
            if threes > 0 and twos > 0:
                f6 = 1
                threes -= 1
                twos -= 1
            elif threes > 0 and f8 > 0:
                f8 -= 1
                f9 += 1
                f6 = 2
                threes -= 1
            f4 = twos // 2
            twos %= 2
            f2 = twos
            f3 = threes
            if f2 > 0 and f6 > 0:
                f6 -= 1
                f8 += 1
                f2 -= 1
            return {9: f9, 8: f8, 7: f7, 6: f6, 5: f5, 4: f4, 3: f3, 2: f2}
            
        def build_suffix(counts, length):
            factor_map = get_min_digits(counts)
            digits = []
            for d in range(2, 10):
                digits.extend([str(d)] * factor_map.get(d, 0))
            digits.sort()
            return '1' * (length - len(digits)) + ''.join(digits)
            
        digit_factors = {
            0: collections.Counter(), 1: collections.Counter(),
            2: collections.Counter([2]), 3: collections.Counter([3]),
            4: collections.Counter([2, 2]), 5: collections.Counter([5]),
            6: collections.Counter([2, 3]), 7: collections.Counter([7]),
            8: collections.Counter([2, 2, 2]), 9: collections.Counter([3, 3])
        }
        
        first_zero = num.find('0')
        if first_zero == -1:
            num_p = collections.Counter()
            for ch in num:
                num_p += digit_factors[int(ch)]
            if all(num_p[p] >= target_p[p] for p in primes):
                return num
                
        n = len(num)
        prefix_p = collections.Counter()
        for i in range(n):
            d = int(num[i])
            if d == 0:
                break
            prefix_p += digit_factors[d]
            
        limit = n if first_zero == -1 else first_zero
        for i in range(limit, -1, -1):
            if i < n:
                d_orig = int(num[i])
                prefix_p -= digit_factors[d_orig]
            else:
                d_orig = 0
            spaces = n - 1 - i
            start_digit = (d_orig + 1) if i < n else 1
            for bigger in range(start_digit, 10):
                needed = collections.Counter()
                for p in primes:
                    req = target_p[p] - prefix_p[p] - digit_factors[bigger][p]
                    if req > 0:
                        needed[p] = req
                min_digs = get_min_digits(needed)
                if sum(min_digs.values()) <= spaces:
                    pref = num[:i] + str(bigger)
                    suff = build_suffix(needed, spaces)
                    return pref + suff
                    
        needed_all = collections.Counter()
        for p in primes:
            if target_p[p] > 0:
                needed_all[p] = target_p[p]
        return build_suffix(needed_all, n + 1)
