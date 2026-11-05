from collections import Counter

class Solution:
    def filterCharacters(self, s: str, k: int) -> str:
        freq = Counter(s)
        return "".join(ch for ch in s if freq[ch] >= k)

def run_tests():
    sol = Solution()
    assert sol.filterCharacters("banana", 2) == "anana"
    assert sol.filterCharacters("apple", 2) == "pp"
    assert sol.filterCharacters("abc", 2) == ""
    print("All tests passed for 3662.")

if __name__ == "__main__":
    run_tests()
