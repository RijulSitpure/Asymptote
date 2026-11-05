from collections import Counter

class Solution:
    def countCaesarPairs(self, words: list[str]) -> int:
        def normalize(w: str) -> str:
            offset = ord(w[0]) - ord('a')
            return "".join(chr((ord(c) - ord('a') - offset) % 26 + ord('a')) for c in w)
        
        counts = Counter(normalize(w) for w in words)
        return sum(m * (m - 1) // 2 for m in counts.values())

def run_tests():
    sol = Solution()
    assert sol.countCaesarPairs(["abc", "bcd", "cde"]) == 3 # 3 pairs among all 3 shifted words
    assert sol.countCaesarPairs(["aaa", "bbb", "ccc", "ddd"]) == 6
    assert sol.countCaesarPairs(["abc", "xyz"]) == 1
    print("All tests passed for 3805.")

if __name__ == "__main__":
    run_tests()
