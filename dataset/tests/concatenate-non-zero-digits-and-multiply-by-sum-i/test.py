class Solution:
    def concatenateAndMultiply(self, n: int) -> int:
        s = str(n)
        non_zero = "".join(c for c in s if c != '0')
        C = int(non_zero) if non_zero else 0
        S = sum(int(c) for c in s)
        return C * S

def run_tests():
    sol = Solution()
    # 102 -> non-zero "12" = 12; sum = 1+0+2=3 -> 12 * 3 = 36
    assert sol.concatenateAndMultiply(102) == 36
    assert sol.concatenateAndMultiply(50) == 25 # C=5, S=5 -> 25
    assert sol.concatenateAndMultiply(0) == 0
    print("All tests passed for 3754.")

if __name__ == "__main__":
    run_tests()