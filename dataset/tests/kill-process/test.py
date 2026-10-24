import sys
from typing import List

class Solution:
    def killProcess(self, pid: List[int], ppid: List[int], kill: int) -> List[int]:
        from collections import defaultdict, deque
        children = defaultdict(list)
        for p, parent in zip(pid, ppid):
            children[parent].append(p)
        res = []
        q = deque([kill])
        while q:
            curr = q.popleft()
            res.append(curr)
            for child in children[curr]:
                q.append(child)
        return res

def test():
    sol = Solution()
    res = sol.killProcess([1, 3, 10, 5], [3, 0, 5, 3], 5)
    assert sorted(res) == [5, 10], "test 1 failed"
    assert sol.killProcess([1], [0], 1) == [1], "test 2 failed"
    print("✓ kill-process passed")

if __name__ == "__main__":
    test()
