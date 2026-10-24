from collections import Counter
from typing import List

class Solution:
    def numRabbits(self, answers: List[int]) -> int:
        counts = Counter(answers)
        total = 0
        for k, count in counts.items():
            group_size = k + 1
            num_groups = (count + k) // group_size
            total += num_groups * group_size
        return total

def test():
    sol = Solution()
    assert sol.numRabbits([1, 1, 2]) == 5, "test 1 failed"
    assert sol.numRabbits([10, 10, 10]) == 11, "test 2 failed"
    assert sol.numRabbits([]) == 0, "test 3 failed"
    print("✓ rabbits-in-forest passed")

if __name__ == "__main__":
    test()
