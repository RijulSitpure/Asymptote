import heapq

class Solution:
    def assignTasks(self, servers: list[int], tasks: list[int]) -> list[int]:
        free = [(w, i) for i, w in enumerate(servers)]
        heapq.heapify(free)
        busy = []

        ans = []
        curr_time = 0

        for i, task_dur in enumerate(tasks):
            curr_time = max(curr_time, i)
            if not free and busy[0][0] > curr_time:
                curr_time = busy[0][0]

            while busy and busy[0][0] <= curr_time:
                _, w, s_idx = heapq.heappop(busy)
                heapq.heappush(free, (w, s_idx))

            w, s_idx = heapq.heappop(free)
            ans.append(s_idx)
            heapq.heappush(busy, (curr_time + task_dur, w, s_idx))

        return ans

def test():
    sol = Solution()
    assert sol.assignTasks([3,3,2], [1,2,3,2,1,2]) == [2,2,0,2,1,2]
    assert sol.assignTasks([5,1,4,3,2], [2,1,2,4,5,2,1]) == [1,4,1,4,1,3,2]

if __name__ == '__main__':
    test()
