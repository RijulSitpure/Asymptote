import math

class Solution:
    def countDifferentSubsequenceGCDs(self, nums: list[int]) -> int:
        max_val = max(nums)
        has = [False] * (max_val + 1)
        for x in nums:
            has[x] = True

        ans = 0
        for g in range(1, max_val + 1):
            curr_gcd = 0
            for m in range(g, max_val + 1, g):
                if has[m]:
                    curr_gcd = math.gcd(curr_gcd, m)
                    if curr_gcd == g:
                        ans += 1
                        break
        return ans

def test():
    sol = Solution()
    assert sol.countDifferentSubsequenceGCDs([6,10,3]) == 5
    assert sol.countDifferentSubsequenceGCDs([5,15,40,5,6]) == 7

if __name__ == '__main__':
    test()
