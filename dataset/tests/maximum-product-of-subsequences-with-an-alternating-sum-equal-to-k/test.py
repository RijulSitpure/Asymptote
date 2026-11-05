class Solution:
    def maxProduct(self, nums: list[int], k: int, limit: int) -> int:
        dp = {}
        for x in nums:
            newdp = dp.copy()
            if x <= limit:
                newdp[(x, 1)] = max(newdp.get((x, 1), -1), x)
            for (s, par), prod in dp.items():
                np = prod * x
                if np <= limit:
                    ns = s + x if par == 0 else s - x
                    next_par = 1 - par
                    newdp[(ns, next_par)] = max(newdp.get((ns, next_par), -1), np)
            dp = newdp
        return max(dp.get((k, 0), -1), dp.get((k, 1), -1))

def run_tests():
    s = Solution()
    assert s.maxProduct([1, 2, 3, 4], 2, 10) == 6
    assert s.maxProduct([5, 5, 5], 5, 10) == 5
    print("All tests passed for maximum-product-of-subsequences-with-an-alternating-sum-equal-to-k")

if __name__ == '__main__':
    run_tests()
