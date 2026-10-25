from collections import deque, Counter

class Solution:
    def watchedVideosByFriends(self, watchedVideos: list[list[str]], friends: list[list[int]], id: int, level: int) -> list[str]:
        q = deque([id])
        visited = {id}
        cur_level = 0
        while q and cur_level < level:
            for _ in range(len(q)):
                u = q.popleft()
                for v in friends[u]:
                    if v not in visited:
                        visited.add(v)
                        q.append(v)
            cur_level += 1
        counts = Counter()
        for friend in q:
            for vid in watchedVideos[friend]:
                counts[vid] += 1
        return sorted(counts.keys(), key=lambda x: (counts[x], x))

def test():
    sol = Solution()
    assert sol.watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]], [[1,2],[0,3],[0,3],[1,2]], 0, 1) == ["B","C"], "test 1 failed"
    assert sol.watchedVideosByFriends([["A","B"],["C"],["B","C"],["D"]], [[1,2],[0,3],[0,3],[1,2]], 0, 2) == ["D"], "test 2 failed"
    print("✓ get-watched-videos-by-your-friends passed")

if __name__ == "__main__":
    test()
