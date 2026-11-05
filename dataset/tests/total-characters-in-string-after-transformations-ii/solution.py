class Solution:
    def lengthAfterTransformations(self, s: str, t: int, nums: list[int]) -> int:
        MOD = 1_000_000_007
        M = [[0] * 26 for _ in range(26)]
        for i in range(26):
            for step in range(1, nums[i] + 1):
                target = (i + step) % 26
                M[i][target] += 1

        def mat_mul(A, B):
            C = [[0] * 26 for _ in range(26)]
            for i in range(26):
                for k in range(26):
                    if A[i][k]:
                        for j in range(26):
                            C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD
            return C

        def mat_pow(A, p):
            res = [[1 if i == j else 0 for j in range(26)] for i in range(26)]
            base = A
            while p > 0:
                if p & 1:
                    res = mat_mul(res, base)
                base = mat_mul(base, base)
                p >>= 1
            return res

        Mt = mat_pow(M, t)
        initial = [0] * 26
        for ch in s:
            initial[ord(ch) - ord('a')] += 1

        ans = 0
        for i in range(26):
            if initial[i]:
                generated = sum(Mt[i]) % MOD
                ans = (ans + initial[i] * generated) % MOD
                
        return ans
