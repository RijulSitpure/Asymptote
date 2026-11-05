class Solution:
    def findProductsOfElements(self, queries: list[list[int]]) -> list[int]:
        def count_bit(n, b):
            period = 1 << (b + 1)
            full = (n + 1) // period
            rem = (n + 1) % period
            return full * (1 << b) + max(0, rem - (1 << b))

        def total_bits(n):
            return sum(count_bit(n, b) for b in range(60))

        def total_power_sum(n):
            return sum(b * count_bit(n, b) for b in range(60))

        def sum_powers(k):
            if k <= 0:
                return 0
            low, high = 1, k
            x = 0
            while low <= high:
                mid = (low + high) // 2
                if total_bits(mid) <= k:
                    x = mid
                    low = mid + 1
                else:
                    high = mid - 1

            res = total_power_sum(x)
            rem = k - total_bits(x)
            nxt = x + 1
            for b in range(60):
                if rem == 0:
                    break
                if (nxt >> b) & 1:
                    res += b
                    rem -= 1
            return res

        ans = []
        for l, r, mod in queries:
            exp = sum_powers(r + 1) - sum_powers(l)
            ans.append(pow(2, exp, mod))
        return ans
