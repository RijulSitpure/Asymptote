class Solution:
    def minFlipsToReverse(self, s: str) -> int:
        # Minimum flips to make s equal to its reverse
        # s[i] must equal s[n - 1 - i]
        n = len(s)
        flips = 0
        for i in range(n // 2):
            if s[i] != s[n - 1 - i]:
                flips += 1
        return flips

def run_tests():
    sol = Solution()
    assert sol.minFlipsToReverse("01") == 1 # 0 != 1 -> 1 flip to make 00 or 11
    assert sol.minFlipsToReverse("1001") == 0 # already palindromic
    assert sol.minFlipsToReverse("110") == 1 # 1 != 0 -> 1 flip
    print("All tests passed for 3750.")

if __name__ == "__main__":
    run_tests()