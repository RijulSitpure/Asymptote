from collections import Counter
from typing import List

class Solution:
    def majorityFrequencyCharacters(self, s: str) -> List[str]:
        freq = Counter(s)
        max_f = max(freq.values())
        return sorted([ch for ch, f in freq.items() if f == max_f])

def run_tests():
    sol = Solution()
    assert sol.majorityFrequencyCharacters("banana") == ["a"] # 'a' appears 3 times
    assert sol.majorityFrequencyCharacters("aabbcc") == ["a", "b", "c"]
    assert sol.majorityFrequencyCharacters("z") == ["z"]
    print("All tests passed for 3692.")

if __name__ == "__main__":
    run_tests()
