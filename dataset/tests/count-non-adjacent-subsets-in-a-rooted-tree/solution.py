def countNonAdjacentSubsets(parent: list[int], nums: list[int], k: int) -> int:
    MOD = 1_000_000_007
    n = len(nums)
    children = [[] for _ in range(n)]
    for i in range(1, n):
        children[parent[i]].append(i)

    def dfs(u: int):
        dp0 = [0] * k
        dp0[0] = 1
        dp1 = [0] * k
        dp1[nums[u] % k] = 1
        for v in children[u]:
            c0, c1 = dfs(v)
            c_comb = [(c0[r] + c1[r]) % MOD for r in range(k)]
            next_dp0 = [0] * k
            for r1 in range(k):
                if dp0[r1]:
                    for r2 in range(k):
                        if c_comb[r2]:
                            nr = (r1 + r2) % k
                            next_dp0[nr] = (next_dp0[nr] + dp0[r1] * c_comb[r2]) % MOD
            dp0 = next_dp0
            next_dp1 = [0] * k
            for r1 in range(k):
                if dp1[r1]:
                    for r2 in range(k):
                        if c0[r2]:
                            nr = (r1 + r2) % k
                            next_dp1[nr] = (next_dp1[nr] + dp1[r1] * c0[r2]) % MOD
            dp1 = next_dp1
        return dp0, dp1

    root_dp0, root_dp1 = dfs(0)
    ans = (root_dp0[0] + root_dp1[0] - 1 + MOD) % MOD
    return ans