from collections import defaultdict

class Solution:
    def countAlternatingXorPartitions(self, nums: list[int], x1: int, x2: int) -> int:
        MOD = 1_000_000_007
        dp1_map = defaultdict(int)
        dp2_map = defaultdict(int)
        
        dp2_map[0] = 1
        dp1_map[0] = 1
        
        pref = 0
        cur_ways1 = cur_ways2 = 0
        for x in nums:
            pref ^= x
            cur_ways1 = dp2_map[pref ^ x1] % MOD
            cur_ways2 = dp1_map[pref ^ x2] % MOD
            
            dp1_map[pref] = (dp1_map[pref] + cur_ways1) % MOD
            dp2_map[pref] = (dp2_map[pref] + cur_ways2) % MOD
        
        if x1 == x2:
            return cur_ways1
        return (cur_ways1 + cur_ways2) % MOD

def run_tests():
    sol = Solution()
    assert sol.countAlternatingXorPartitions([1, 2, 3], 1, 1) == 1 # [1, 2^3=1] -> 2 segments of XOR 1
    assert sol.countAlternatingXorPartitions([1, 2], 1, 2) == 1 # [1], [2] -> XOR 1 then XOR 2
    print("All tests passed for 3811.")

if __name__ == "__main__":
    run_tests()
