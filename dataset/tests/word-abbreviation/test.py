from collections import defaultdict
from typing import List

class Solution:
    def wordsAbbreviation(self, words: List[str]) -> List[str]:
        n = len(words)
        prefix_lens = [1] * n

        def make_abbr(word: str, k: int) -> str:
            if len(word) - 1 - k <= 1:
                return word
            return word[:k] + str(len(word) - 1 - k) + word[-1]

        ans = [make_abbr(w, 1) for w in words]

        while True:
            groups = defaultdict(list)
            for i, abbr in enumerate(ans):
                groups[abbr].append(i)
            has_conflict = False
            for abbr, indices in groups.items():
                if len(indices) > 1:
                    has_conflict = True
                    for idx in indices:
                        prefix_lens[idx] += 1
                        ans[idx] = make_abbr(words[idx], prefix_lens[idx])
            if not has_conflict:
                break

        return ans

def test():
    sol = Solution()
    t1 = ["like","god","internal","me","internet","interval","intension","face","intrusion"]
    out1 = sol.wordsAbbreviation(t1)
    assert out1 == ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"], "test 1 failed"
    t2 = ["aa","aaa"]
    assert sol.wordsAbbreviation(t2) == ["aa","aaa"], "test 2 failed"
    print("✓ word-abbreviation passed")

if __name__ == "__main__":
    test()
