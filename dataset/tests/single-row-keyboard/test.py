class Solution:
    def calculateTime(self, keyboard: str, word: str) -> int:
        pos = {c: i for i, c in enumerate(keyboard)}
        curr = 0
        total = 0
        for c in word:
            nxt = pos[c]
            total += abs(nxt - curr)
            curr = nxt
        return total

def test():
    sol = Solution()
    assert sol.calculateTime("abcdefghijklmnopqrstuvwxyz", "cba") == 4, "test 1 failed"
    assert sol.calculateTime("pqrstuvwxyzabcdefghijklmno", "leetcode") == 73, "test 2 failed"
    print("✓ single-row-keyboard passed")

if __name__ == "__main__":
    test()
