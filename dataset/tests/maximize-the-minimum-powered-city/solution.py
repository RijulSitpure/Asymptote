class Solution:
    def maxPower(self, stations: list[int], r: int, k: int) -> int:
        n = len(stations)
        power = [0] * n
        cur = sum(stations[:r + 1])
        power[0] = cur
        for i in range(1, n):
            if i + r < n:
                cur += stations[i + r]
            if i - r - 1 >= 0:
                cur -= stations[i - r - 1]
            power[i] = cur
            
        def check(target):
            diff = [0] * (n + 1)
            add = 0
            used = 0
            for i in range(n):
                add += diff[i]
                cur_p = power[i] + add
                if cur_p < target:
                    need = target - cur_p
                    used += need
                    if used > k:
                        return False
                    add += need
                    pos = min(n - 1, i + r)
                    end = min(n, pos + r + 1)
                    diff[end] -= need
            return True

        lo = min(power)
        hi = lo + k
        ans = lo
        while lo <= hi:
            mid = (lo + hi) // 2
            if check(mid):
                ans = mid
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
