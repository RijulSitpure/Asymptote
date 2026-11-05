class Solution:
    def countPermutations(self, n: int) -> int:
        if n <= 1:
            return 1
        MOD = 1_000_000_007
        ans = 1
        for i in range(1, n):
            ans = (ans * i) % MOD
        return ans

def run_tests():
    s = Solution()
    res1 = s.countPermutations(3)
    assert res1 == 2, f"Expected 2, got {res1}" # (3-1)! = 2
    res2 = s.countPermutations(4)
    assert res2 == 6, f"Expected 6, got {res2}" # (4-1)! = 6
    print("3577 count-the-number-of-computer-unlocking-permutations PASSED")

if __name__ == "__main__":
    run_tests()
