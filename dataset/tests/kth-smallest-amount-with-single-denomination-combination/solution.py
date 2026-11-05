import math

class Solution:
    def findKthSmallest(self, coins: list[int], k: int) -> int:
        m = len(coins)
        subsets = []
        for mask in range(1, 1 << m):
            lcm_val = 1
            bits = 0
            for i in range(m):
                if (mask >> i) & 1:
                    bits += 1
                    lcm_val = (lcm_val * coins[i]) // math.gcd(lcm_val, coins[i])
            sign = 1 if bits % 2 == 1 else -1
            subsets.append((lcm_val, sign))

        def count(x):
            total = 0
            for lcm_val, sign in subsets:
                total += sign * (x // lcm_val)
            return total

        low = 1
        high = min(coins) * k
        ans = high
        while low <= high:
            mid = (low + high) // 2
            if count(mid) >= k:
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans
