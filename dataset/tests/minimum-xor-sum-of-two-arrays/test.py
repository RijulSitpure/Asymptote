class Solution:
    def minimumXORSum(self, nums1: list[int], nums2: list[int]) -> int:
        n = len(nums1)
        dp = [float('inf')] * (1 << n)
        dp[0] = 0

        for mask in range(1 << n):
            i = bin(mask).count('1')
            if i >= n:
                continue
            for j in range(n):
                if not (mask & (1 << j)):
                    next_mask = mask | (1 << j)
                    cost = dp[mask] + (nums1[i] ^ nums2[j])
                    if cost < dp[next_mask]:
                        dp[next_mask] = cost

        return dp[(1 << n) - 1]

def test():
    sol = Solution()
    assert sol.minimumXORSum([1,2], [2,3]) == 2
    assert sol.minimumXORSum([1,0,3], [5,3,4]) == 8

if __name__ == '__main__':
    test()
