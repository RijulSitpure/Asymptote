class Solution:
    def smallestNegatedPermutation(self, nums: list[int], target: int) -> list[int]:
        # Assign + and - signs to a permutation of nums so total sum equals target
        # S = sum(nums). Total sum with subset P positive and subset N negative is:
        # sum(P) - sum(N) = target <=> sum(P) - (S - sum(P)) = target <=> 2 * sum(P) = S + target
        # So sum(P) must equal (S + target) // 2
        S = sum(nums)
        if (S + target) % 2 != 0 or S + target < 0:
            return []
        P_target = (S + target) // 2
        
        # 0/1 knapsack to find if subset summing to P_target exists
        n = len(nums)
        sorted_nums = sorted(nums)
        dp = {0: []}
        for x in sorted_nums:
            new_dp = dict(dp)
            for s, items in dp.items():
                if s + x <= P_target and (s + x) not in new_dp:
                    new_dp[s + x] = items + [x]
            dp = new_dp
            
        if P_target not in dp:
            return []
            
        pos_items = list(dp[P_target])
        rem = list(sorted_nums)
        for x in pos_items:
            rem.remove(x)
        # Rem are negative
        neg_items = [-x for x in rem]
        # Lexicographically smallest permutation: sort all resulting signed numbers
        res = sorted(pos_items + neg_items)
        return res

def run_tests():
    sol = Solution()
    assert sol.smallestNegatedPermutation([1, 2, 3], 0) == [-3, 1, 2] # sum is -3+1+2=0
    assert sol.smallestNegatedPermutation([2, 2], 0) == [-2, 2]
    assert sol.smallestNegatedPermutation([1], 2) == []
    print("All tests passed for 3752.")

if __name__ == "__main__":
    run_tests()