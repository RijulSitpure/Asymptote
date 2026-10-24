import sys
from typing import List

class Solution:
    def sequenceReconstruction(self, nums: List[int], sequences: List[List[int]]) -> bool:
        from collections import defaultdict, deque
        graph = defaultdict(set)
        indegree = {x: 0 for x in nums}
        for seq in sequences:
            for i in range(len(seq) - 1):
                u, v = seq[i], seq[i + 1]
                if u in indegree and v in indegree and v not in graph[u]:
                    graph[u].add(v)
                    indegree[v] += 1
        q = deque([x for x, d in indegree.items() if d == 0])
        idx = 0
        while q:
            if len(q) > 1:
                return False
            curr = q.popleft()
            if curr != nums[idx]:
                return False
            idx += 1
            for neighbor in graph[curr]:
                indegree[neighbor] -= 1
                if indegree[neighbor] == 0:
                    q.append(neighbor)
        return idx == len(nums)

def test():
    sol = Solution()
    assert sol.sequenceReconstruction([1, 2, 3], [[1, 2], [1, 3]]) is False, "test 1 failed"
    assert sol.sequenceReconstruction([1, 2, 3], [[1, 2], [2, 3]]) is True, "test 2 failed"
    print("✓ sequence-reconstruction passed")

if __name__ == "__main__":
    test()
