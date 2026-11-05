class Solution:
    def numberOfZigzagArrays(self, n: int, m: int) -> int:
        MOD = 1_000_000_007
        if n == 1:
            return m % MOD
        # dp_up[v]: number of zigzag prefixes of length i ending with value v where last step was UP
        # dp_down[v]: number of zigzag prefixes of length i ending with value v where last step was DOWN
        # Base case length 2:
        dp_up = [0] * (m + 1)
        dp_down = [0] * (m + 1)
        for v in range(1, m + 1):
            dp_up[v] = v - 1 # previous element was smaller (1 .. v-1)
            dp_down[v] = m - v # previous element was larger (v+1 .. m)
            
        for _ in range(3, n + 1):
            next_up = [0] * (m + 1)
            next_down = [0] * (m + 1)
            # To step up to v, previous step had to be down to u < v
            # sum(dp_down[u] for u in 1..v-1)
            pref = 0
            for v in range(1, m + 1):
                next_up[v] = pref
                pref = (pref + dp_down[v]) % MOD
            # To step down to v, previous step had to be up to u > v
            # sum(dp_up[u] for u in v+1..m)
            suff = 0
            for v in range(m, 0, -1):
                next_down[v] = suff
                suff = (suff + dp_up[v]) % MOD
            dp_up, dp_down = next_up, next_down
            
        return (sum(dp_up) + sum(dp_down)) % MOD

def run_tests():
    sol = Solution()
    assert sol.numberOfZigzagArrays(1, 3) == 3
    assert sol.numberOfZigzagArrays(2, 3) == 6 # (1,2),(1,3),(2,3) up; (2,1),(3,1),(3,2) down
    assert sol.numberOfZigzagArrays(3, 3) == 10
    print("All tests passed for 3699.")

if __name__ == "__main__":
    run_tests()