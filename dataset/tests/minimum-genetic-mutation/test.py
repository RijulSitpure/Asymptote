import sys
from typing import List

class Solution:
    def minMutation(self, startGene: str, endGene: str, bank: List[str]) -> int:
        from collections import deque
        bank_set = set(bank)
        if endGene not in bank_set:
            return -1
        q = deque([(startGene, 0)])
        visited = {startGene}
        while q:
            curr, step = q.popleft()
            if curr == endGene:
                return step
            for i in range(len(curr)):
                for ch in "ACGT":
                    if ch != curr[i]:
                        neighbor = curr[:i] + ch + curr[i + 1:]
                        if neighbor in bank_set and neighbor not in visited:
                            visited.add(neighbor)
                            q.append((neighbor, step + 1))
        return -1

def test():
    sol = Solution()
    assert sol.minMutation("AACCGGTT", "AACCGGTA", ["AACCGGTA"]) == 1, "test 1 failed"
    assert sol.minMutation("AACCGGTT", "AAACGGTA", ["AACCGGTA","AACCGCTA","AAACGGTA"]) == 2, "test 2 failed"
    print("✓ minimum-genetic-mutation passed")

if __name__ == "__main__":
    test()
