from collections import Counter
from typing import List

class Solution:
    def maxCardPairs(self, cards: List[str]) -> int:
        counts = Counter(cards)
        ans = 0
        for card, cnt in list(counts.items()):
            ans += cnt // 2
            counts[card] %= 2
        by_first = Counter()
        for card, cnt in counts.items():
            if cnt > 0:
                by_first[card[0]] += cnt
        for ch, cnt in by_first.items():
            ans += cnt // 2
        return ans

def run_tests():
    sol = Solution()
    assert sol.maxCardPairs(["ab", "ab", "ac", "ad"]) == 2
    assert sol.maxCardPairs(["ab", "cd"]) == 0
    assert sol.maxCardPairs(["aa", "aa", "aa", "aa"]) == 2
    print("All tests passed for 3664.")

if __name__ == "__main__":
    run_tests()
