import sys

class Solution:
    def predictPartyVictory(self, senate: str) -> str:
        from collections import deque
        r_queue = deque()
        d_queue = deque()
        n = len(senate)
        for i, c in enumerate(senate):
            if c == "R":
                r_queue.append(i)
            else:
                d_queue.append(i)
        while r_queue and d_queue:
            r_idx = r_queue.popleft()
            d_idx = d_queue.popleft()
            if r_idx < d_idx:
                r_queue.append(r_idx + n)
            else:
                d_queue.append(d_idx + n)
        return "Radiant" if r_queue else "Dire"

def test():
    sol = Solution()
    assert sol.predictPartyVictory("RD") == "Radiant", "test 1 failed"
    assert sol.predictPartyVictory("RDD") == "Dire", "test 2 failed"
    print("✓ dota2-senate passed")

if __name__ == "__main__":
    test()
