import heapq

class Node:
    def __init__(self, val: int, idx: int):
        self.val = val
        self.idx = idx
        self.prev = None
        self.next = None

class Solution:
    def minimumPairRemoval(self, nums: list[int]) -> int:
        n = len(nums)
        if n < 2:
            return 0
        nodes = [Node(nums[i], i) for i in range(n)]
        for i in range(n):
            if i > 0: nodes[i].prev = nodes[i - 1]
            if i < n - 1: nodes[i].next = nodes[i + 1]

        inversions = 0
        for i in range(n - 1):
            if nodes[i].val > nodes[i + 1].val:
                inversions += 1

        heap = []
        active = [True] * n
        for i in range(n - 1):
            heapq.heappush(heap, (nodes[i].val + nodes[i + 1].val, i))

        ops = 0
        while inversions > 0:
            found = False
            while heap:
                s, i = heapq.heappop(heap)
                if not active[i]: continue
                nxt = nodes[i].next
                if nxt is None or not active[nxt.idx]: continue
                if nodes[i].val + nxt.val == s:
                    left, right = nodes[i], nxt
                    found = True
                    break
            if not found: break

            ops += 1
            if left.prev and left.prev.val > left.val: inversions -= 1
            if left.val > right.val: inversions -= 1
            if right.next and right.val > right.next.val: inversions -= 1

            left.val += right.val
            active[right.idx] = False
            left.next = right.next
            if right.next: right.next.prev = left

            if left.prev and left.prev.val > left.val: inversions += 1
            if left.next and left.val > left.next.val: inversions += 1

            if left.prev:
                heapq.heappush(heap, (left.prev.val + left.val, left.prev.idx))
            if left.next:
                heapq.heappush(heap, (left.val + left.next.val, left.idx))
        return ops

def run_tests():
    s = Solution()
    assert s.minimumPairRemoval([5, 2, 3, 1]) == 2
    assert s.minimumPairRemoval([1, 2, 3]) == 0
    print("All tests passed for minimum-pair-removal-to-sort-array-ii")

if __name__ == '__main__':
    run_tests()
