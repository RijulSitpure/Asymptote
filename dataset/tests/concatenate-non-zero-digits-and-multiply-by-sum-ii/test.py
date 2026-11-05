class Solution:
    def concatenateAndMultiplyII(self, s: str) -> int:
        MOD = 1_000_000_007
        non_zero = "".join(c for c in s if c != '0')
        if not non_zero:
            return 0
        C = 0
        for c in non_zero:
            C = (C * 10 + int(c)) % MOD
        S = sum(int(c) for c in s) % MOD
        return (C * S) % MOD

def run_tests():
    sol = Solution()
    assert sol.concatenateAndMultiplyII("102") == 36
    assert sol.concatenateAndMultiplyII("50") == 25
    assert sol.concatenateAndMultiplyII("0") == 0
    print("All tests passed for 3756.")

if __name__ == "__main__":
    run_tests()