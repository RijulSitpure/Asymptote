from collections import defaultdict

class Solution:
    def countPairs(self, deliciousness: list[int]) -> int:
        MOD = 10**9 + 7
        freq = defaultdict(int)
        powers = [1 << p for p in range(22)]
        ans = 0
        for x in deliciousness:
            for p in powers:
                target = p - x
                if target in freq:
                    ans = (ans + freq[target]) % MOD
            freq[x] += 1
        return ans

def test():
    sol = Solution()
    assert sol.countPairs([1,3,5,7,9]) == 4
    assert sol.countPairs([1,1,1,3,3,3,7]) == 15

    print("✓ count-good-meals passed")

if __name__ == '__main__':
    test()
