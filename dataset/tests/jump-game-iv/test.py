from collections import deque, defaultdict

class Solution:
    def minJumps(self, arr: list[int]) -> int:
        n = len(arr)
        if n <= 1:
            return 0
        graph = defaultdict(list)
        for i, x in enumerate(arr):
            graph[x].append(i)
        q = deque([(0, 0)])
        visited = {0}
        while q:
            i, steps = q.popleft()
            if i == n - 1:
                return steps
            neighbors = [i - 1, i + 1]
            if arr[i] in graph:
                neighbors.extend(graph[arr[i]])
                del graph[arr[i]]
            for nxt in neighbors:
                if 0 <= nxt < n and nxt not in visited:
                    visited.add(nxt)
                    q.append((nxt, steps + 1))
        return -1

def test():
    sol = Solution()
    assert sol.minJumps([100,-23,-23,404,100,23,23,23,3,404]) == 3, "test 1 failed"
    assert sol.minJumps([7]) == 0, "test 2 failed"
    assert sol.minJumps([7,6,9,6,9,6,9,7]) == 1, "test 3 failed"
    print("✓ jump-game-iv passed")

if __name__ == "__main__":
    test()
