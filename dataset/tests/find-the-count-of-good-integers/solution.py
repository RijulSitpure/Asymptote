class Solution:
    def countGoodIntegers(self, n: int, k: int) -> int:
        from collections import Counter
        import math
        
        half = (n + 1) // 2
        start = 10 ** (half - 1)
        end = 10 ** half
        
        valid_multisets = set()
        
        for num in range(start, end):
            s = str(num)
            if n % 2 == 1:
                pal_str = s + s[-2::-1]
            else:
                pal_str = s + s[::-1]
            if int(pal_str) % k == 0:
                digit_counts = tuple(sorted(Counter(pal_str).items()))
                valid_multisets.add(digit_counts)
                
        def permutations_for_multiset(counts_dict):
            total_digits = sum(counts_dict.values())
            # Total arrangements
            total = math.factorial(total_digits)
            for cnt in counts_dict.values():
                total //= math.factorial(cnt)
            # Subtract arrangements starting with 0
            if counts_dict.get('0', 0) > 0:
                with_zero = math.factorial(total_digits - 1)
                for d, cnt in counts_dict.items():
                    if d == '0':
                        with_zero //= math.factorial(cnt - 1)
                    else:
                        with_zero //= math.factorial(cnt)
                total -= with_zero
            return total
            
        ans = 0
        for items in valid_multisets:
            c = dict(items)
            ans += permutations_for_multiset(c)
        return ans
