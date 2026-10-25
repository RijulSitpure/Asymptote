class Solution:
    def stringMatching(self, words: list[str]) -> list[str]:
        res = []
        for i, w1 in enumerate(words):
            for j, w2 in enumerate(words):
                if i != j and w1 in w2:
                    res.append(w1)
                    break
        return res

def test():
    sol = Solution()
    assert sol.stringMatching(["mass","as","hero","superhero"]) == ["as","hero"], "test 1 failed"
    assert sol.stringMatching(["leetcode","et","code"]) == ["et","code"], "test 2 failed"
    assert sol.stringMatching(["blue","green","bu"]) == [], "test 3 failed"
    print("✓ string-matching-in-an-array passed")

if __name__ == "__main__":
    test()
