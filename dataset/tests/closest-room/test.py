import bisect

class Solution:
    def closestRoom(self, rooms: list[list[int]], queries: list[list[int]]) -> list[int]:
        rooms.sort(key=lambda x: -x[1])
        indexed_queries = sorted([(q[1], q[0], i) for i, q in enumerate(queries)], reverse=True)

        active = []
        ans = [-1] * len(queries)
        room_idx = 0
        n = len(rooms)

        for min_sz, pref, q_idx in indexed_queries:
            while room_idx < n and rooms[room_idx][1] >= min_sz:
                bisect.insort(active, rooms[room_idx][0])
                room_idx += 1

            if not active:
                continue

            idx = bisect.bisect_left(active, pref)
            best_id = -1
            min_dist = float('inf')

            if idx < len(active):
                min_dist = active[idx] - pref
                best_id = active[idx]

            if idx > 0:
                dist_left = pref - active[idx - 1]
                if dist_left <= min_dist:
                    best_id = active[idx - 1]

            ans[q_idx] = best_id

        return ans

def test():
    sol = Solution()
    rooms = [[2,2],[1,2],[3,2]]
    queries = [[3,1],[3,3],[5,2]]
    assert sol.closestRoom(rooms, queries) == [3,-1,3]
    assert sol.closestRoom([[1,4],[2,3],[3,5],[4,1],[5,2]], [[2,3],[2,4],[2,5]]) == [2,1,3]

if __name__ == '__main__':
    test()
