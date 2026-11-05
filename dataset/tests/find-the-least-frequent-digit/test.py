from collections import Counter

class Solution:
    def getLeastFrequentDigit(self, n: int) -> int:
        s = str(n)
        freq = Counter(s)
        min_f = min(freq.values())
        cands = [int(d) for d, f in freq.items() if f == min_f]
        return min(cands)

def run_tests():
    sol = Solution()
    assert sol.getLeastFrequentDigit(12233) == 1
    assert sol.getLeastFrequentDigit(112233) == 1
    assert sol.getLeastFrequentDigit(98877) == 9
    print("All tests passed for 3663.")

if __name__ == "__main__":
    run_tests()
