import sys

class Solution:
    def rearrangeString(self, s: str, k: int) -> str:
        if k <= 1:
            return s
        from collections import Counter, deque
        import heapq
        counts = Counter(s)
        max_heap = [(-cnt, ch) for ch, cnt in counts.items()]
        heapq.heapify(max_heap)
        cooldown = deque()
        res = []
        while max_heap:
            cnt, ch = heapq.heappop(max_heap)
            res.append(ch)
            cooldown.append((cnt + 1, ch))
            if len(cooldown) >= k:
                ready_cnt, ready_ch = cooldown.popleft()
                if ready_cnt < 0:
                    heapq.heappush(max_heap, (ready_cnt, ready_ch))
        return "".join(res) if len(res) == len(s) else ""

def test():
    sol = Solution()
    res1 = sol.rearrangeString("aabbcc", 3)
    assert len(res1) == 6, "test 1 failed"
    for i in range(len(res1)):
        for j in range(i + 1, min(len(res1), i + 3)):
            assert res1[i] != res1[j], "distance violation"
    assert sol.rearrangeString("aaabc", 3) == "", "test 2 failed"
    assert sol.rearrangeString("aaadbbcc", 2) != "", "test 3 failed"
    print("✓ rearrange-string-k-distance-apart passed")

if __name__ == "__main__":
    test()
