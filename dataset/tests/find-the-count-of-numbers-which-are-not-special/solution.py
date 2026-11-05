class Solution:
    def nonSpecialCount(self, l: int, r: int) -> int:
        import math
        limit = int(math.isqrt(r))
        is_prime = [True] * (limit + 1)
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(math.isqrt(limit)) + 1):
            if is_prime[p]:
                for i in range(p * p, limit + 1, p):
                    is_prime[i] = False
        special_count = 0
        for p in range(2, limit + 1):
            if is_prime[p]:
                sq = p * p
                if l <= sq <= r:
                    special_count += 1
        return (r - l + 1) - special_count
