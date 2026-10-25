from collections import Counter

class Solution:
    def minimumIncompatibility(self, nums: list[int], k: int) -> int:
        n = len(nums)
        if any(c > k for c in Counter(nums).values()):
            return -1
        sz = n // k
        if sz == 1:
            return 0
        valid = {}
        for mask in range(1 << n):
            if bin(mask).count("1") == sz:
                elements = [nums[i] for i in range(n) if mask & (1 << i)]
                if len(set(elements)) == sz:
                    valid[mask] = max(elements) - min(elements)
        dp = [float("inf")] * (1 << n)
        dp[0] = 0
        for mask in range(1 << n):
            if dp[mask] == float("inf"):
                continue
            # find first unset bit
            first_unset = 0
            while first_unset < n and (mask & (1 << first_unset)):
                first_unset += 1
            if first_unset == n:
                continue
            for sub, cost in valid.items():
                if (sub & (1 << first_unset)) and (mask & sub) == 0:
                    nxt = mask | sub
                    if dp[mask] + cost < dp[nxt]:
                        dp[nxt] = dp[mask] + cost
        return dp[(1 << n) - 1] if dp[(1 << n) - 1] != float("inf") else -1

def test():
    sol = Solution()
    assert sol.minimumIncompatibility([1,2,1,4], 2) == 4
    assert sol.minimumIncompatibility([6,3,8,1,3,1,2,2], 4) == 6
    assert sol.minimumIncompatibility([5,3,3,6,3,4,2,2,4,4], 3) == -1

    print("✓ minimum-incompatibility passed")

if __name__ == '__main__':
    test()
