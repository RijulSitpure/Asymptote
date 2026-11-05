class Solution:
    def minLength(self, s: str, numOps: int) -> int:
        n = len(s)
        
        def check(m: int) -> bool:
            if m == 1:
                diff1 = sum(1 for idx, ch in enumerate(s) if ch != ('0' if idx % 2 == 0 else '1'))
                diff2 = sum(1 for idx, ch in enumerate(s) if ch != ('1' if idx % 2 == 0 else '0'))
                return min(diff1, diff2) <= numOps
            ops = 0
            i = 0
            while i < n:
                j = i
                while j < n and s[j] == s[i]:
                    j += 1
                length = j - i
                ops += length // (m + 1)
                i = j
            return ops <= numOps

        low, high = 1, n
        ans = n
        while low <= high:
            mid = (low + high) // 2
            if check(mid):
                ans = mid
                high = mid - 1
            else:
                low = mid + 1
        return ans
