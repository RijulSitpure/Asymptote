from collections import deque

class Solution:
    def canReach(self, arr: list[int], start: int) -> bool:
        q = deque([start])
        visited = {start}
        while q:
            cur = q.popleft()
            if arr[cur] == 0:
                return True
            for nxt in [cur + arr[cur], cur - arr[cur]]:
                if 0 <= nxt < len(arr) and nxt not in visited:
                    visited.add(nxt)
                    q.append(nxt)
        return False

def test():
    sol = Solution()
    assert sol.canReach([4,2,3,0,3,1,2], 5) == True, "test 1 failed"
    assert sol.canReach([4,2,3,0,3,1,2], 0) == True, "test 2 failed"
    assert sol.canReach([3,0,2,1,2], 2) == False, "test 3 failed"
    print("✓ jump-game-iii passed")

if __name__ == "__main__":
    test()
