from collections import deque

class Solution:
    def countSteppingNumbers(self, low: int, high: int) -> list[int]:
        res = []
        if low == 0:
            res.append(0)
            
        q = deque(range(1, 10))
        while q:
            curr = q.popleft()
            if curr > high:
                continue
            if curr >= low:
                res.append(curr)
            last = curr % 10
            if last > 0:
                nxt = curr * 10 + (last - 1)
                if nxt <= high:
                    q.append(nxt)
            if last < 9:
                nxt = curr * 10 + (last + 1)
                if nxt <= high:
                    q.append(nxt)
                    
        return sorted(res)

def test():
    sol = Solution()
    assert sol.countSteppingNumbers(0, 21) == [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 21], "test 1 failed"
    assert sol.countSteppingNumbers(10, 15) == [10, 12], "test 2 failed"
    print("✓ stepping-numbers passed")

if __name__ == "__main__":
    test()
