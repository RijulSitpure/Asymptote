class Solution:
    def maxBitwiseAnd(self, nums: list[int], k: int) -> int:
        def min_ge_with_mask(x: int, mask: int) -> int:
            if (x & mask) == mask:
                return x
            best = x | mask
            cur_prefix = 0
            for bit in range(30, -1, -1):
                mb = (mask >> bit) & 1
                xb = (x >> bit) & 1
                if mb == 1 and xb == 0:
                    cand = cur_prefix | (1 << bit)
                    for b in range(bit - 1, -1, -1):
                        if (mask >> b) & 1:
                            cand |= (1 << b)
                    if cand >= x and cand < best:
                        best = cand
                    cur_prefix |= (1 << bit)
                elif mb == 0 and xb == 0:
                    cand = cur_prefix | (1 << bit)
                    for b in range(bit - 1, -1, -1):
                        if (mask >> b) & 1:
                            cand |= (1 << b)
                    if cand >= x and cand < best:
                        best = cand
                else:
                    cur_prefix |= (1 << bit)
            return best
        
        ans = 0
        for bit in range(30, -1, -1):
            cand = ans | (1 << bit)
            costs = sorted([min_ge_with_mask(x, cand) - x for x in nums])
            if costs[0] + costs[1] <= k:
                ans = cand
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxBitwiseAnd([1, 2, 3], 0) == 2 # (2 & 3) = 2
    assert sol.maxBitwiseAnd([1, 2], 1) == 2 # increment 1 -> 2: (2 & 2) = 2
    print("All tests passed for 3806.")

if __name__ == "__main__":
    run_tests()
